"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { FLAG_H, FLAG_W, shade } from "@/lib/flag-spec";
import {
  getOutline,
  getPlacement,
  getStitchFont,
  getTextSize,
  getThread,
} from "@/data/customization";

export type TextConfig = {
  line1: string;
  line2: string;
  fontId: string;
  threadId: string;
  outlineId: string;
  placementId: string;
  sizeId: string;
};

/** Largeur maximale du texte : on garde une marge de fourreau à gauche. */
const MAX_TEXT_WIDTH = FLAG_W * 0.82;
const BASE_FONT_SIZE = 42;
const MEASURE_SIZE = 100;

/**
 * Mesure la largeur réelle d'un texte à une taille de référence, afin de
 * pouvoir le réduire pour qu'il tienne dans le drapeau. La mesure est
 * refaite une fois les polices chargées, sinon on mesurerait la police de
 * repli.
 */
function useMeasuredWidth(text: string, family: string, tracking: number) {
  const ref = useRef<SVGTextElement>(null);
  const [width, setWidth] = useState(0);

  const measure = () => {
    const node = ref.current;
    if (!node || !text) return;
    try {
      setWidth(node.getComputedTextLength());
    } catch {
      /* jsdom / navigateurs sans mesure SVG : on garde l'estimation. */
    }
  };

  useLayoutEffect(measure, [text, family, tracking]);

  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    document.fonts.ready.then(measure);
  }, [text, family, tracking]);

  return { ref, width };
}

type LineProps = {
  text: string;
  y: number;
  fontSize: number;
  family: string;
  tracking: number;
  uid: string;
};

/** Une ligne brodée : relief, trame satin, reflet de fil. */
function StitchedLine({
  line,
  threadHex,
  outlineHex,
  uid,
}: {
  line: LineProps;
  threadHex: string;
  outlineHex: string | null;
  uid: string;
}) {
  const { text, y, fontSize, family, tracking } = line;
  const maskId = `${uid}-mask-${y}`;

  const shared = {
    x: FLAG_W / 2,
    y,
    textAnchor: "middle" as const,
    fontFamily: family,
    fontSize,
    fontWeight: 900 as const,
    letterSpacing: fontSize * tracking,
  };

  return (
    <>
      <defs>
        <mask id={maskId}>
          <text {...shared} fill="#fff">
            {text}
          </text>
        </mask>
      </defs>

      {/* Contour et corps partagent le même filtre : sinon le contour reste
          net pendant que la lettre s'effiloche, et l'illusion tombe. */}
      <g filter={`url(#${uid}-stitch)`}>
        {outlineHex && (
          <text
            {...shared}
            fill="none"
            stroke={outlineHex}
            strokeWidth={fontSize * 0.115}
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            {text}
          </text>
        )}

        {/* Le corps de la broderie : le fil bombe, donc bord plus sombre. */}
        <text
          {...shared}
          fill={threadHex}
          stroke={shade(threadHex, -0.45)}
          strokeWidth={fontSize * 0.05}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {text}
        </text>
      </g>

      {/* Trame satin : les points de broderie sont tous inclinés pareil. */}
      <g mask={`url(#${maskId})`} opacity={0.45}>
        <rect x={0} y={0} width={FLAG_W} height={FLAG_H} fill={`url(#${uid}-hatch)`} />
      </g>

      {/* Reflet du fil, décalé vers le haut comme sous une lumière de stade. */}
      <g mask={`url(#${maskId})`} opacity={0.3}>
        <rect
          x={0}
          y={-fontSize * 0.06}
          width={FLAG_W}
          height={FLAG_H}
          fill={`url(#${uid}-sheen)`}
        />
      </g>
    </>
  );
}

/**
 * Texte brodé sur le drapeau.
 * À insérer dans un `<svg viewBox="0 0 300 200">`.
 */
export function EmbroideredText({ config }: { config: TextConfig }) {
  const uid = useId().replace(/:/g, "");
  const font = getStitchFont(config.fontId);
  const thread = getThread(config.threadId);
  const outline = getOutline(config.outlineId);
  const placement = getPlacement(config.placementId);
  const size = getTextSize(config.sizeId);

  const line1 = font.uppercase ? config.line1.toUpperCase() : config.line1;
  const line2 = font.uppercase ? config.line2.toUpperCase() : config.line2;

  const m1 = useMeasuredWidth(line1, font.family, font.tracking);
  const m2 = useMeasuredWidth(line2, font.family, font.tracking);

  const requested = BASE_FONT_SIZE * font.sizeFactor * size.factor;

  // La ligne 1 se réduit pour tenir dans le drapeau ; la ligne 2 suit
  // proportionnellement pour garder la hiérarchie voulue.
  const fitted =
    m1.width > 0
      ? Math.min(requested, (MAX_TEXT_WIDTH / m1.width) * MEASURE_SIZE)
      : requested;
  const size1 = fitted;
  const size2raw = fitted * 0.5;
  const size2 =
    m2.width > 0
      ? Math.min(size2raw, (MAX_TEXT_WIDTH / m2.width) * MEASURE_SIZE)
      : size2raw;

  const hasLine2 = line2.trim().length > 0;
  const baselineY = placement.baseline * FLAG_H;
  // Avec deux lignes, le bloc est recentré autour de la ligne de base.
  const y1 = hasLine2 ? baselineY - size2 * 0.75 : baselineY;
  const y2 = y1 + size1 * 0.72;

  const sheenTop = shade(thread.hex, 0.75);

  return (
    <g>
      <defs>
        {/* Irrégularité du fil + légère ombre portée sur le tissu. */}
        <filter id={`${uid}-stitch`} x="-15%" y="-35%" width="130%" height="170%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.1"
            xChannelSelector="R"
            yChannelSelector="G"
            result="frayed"
          />
          <feDropShadow dx="0" dy="0.9" stdDeviation="0.7" floodColor="#000" floodOpacity="0.5" />
        </filter>

        <pattern
          id={`${uid}-hatch`}
          width="2.6"
          height="2.6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(62)"
        >
          <rect width="2.6" height="2.6" fill="none" />
          <line x1="0" y1="0" x2="0" y2="2.6" stroke={shade(thread.hex, -0.5)} strokeWidth="0.9" />
        </pattern>

        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sheenTop} stopOpacity="1" />
          <stop offset="55%" stopColor={sheenTop} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sondes de mesure : invisibles, servent à calculer la largeur réelle. */}
      <g aria-hidden opacity={0} pointerEvents="none">
        <text
          ref={m1.ref}
          x={-9999}
          y={-9999}
          fontFamily={font.family}
          fontSize={MEASURE_SIZE}
          fontWeight={900}
          letterSpacing={MEASURE_SIZE * font.tracking}
        >
          {line1}
        </text>
        <text
          ref={m2.ref}
          x={-9999}
          y={-9999}
          fontFamily={font.family}
          fontSize={MEASURE_SIZE}
          fontWeight={900}
          letterSpacing={MEASURE_SIZE * font.tracking}
        >
          {line2}
        </text>
      </g>

      {line1.trim() && (
        <StitchedLine
          uid={uid}
          threadHex={thread.hex}
          outlineHex={outline.hex}
          line={{
            text: line1,
            y: y1,
            fontSize: size1,
            family: font.family,
            tracking: font.tracking,
            uid,
          }}
        />
      )}

      {hasLine2 && (
        <StitchedLine
          uid={uid}
          threadHex={thread.hex}
          outlineHex={outline.hex}
          line={{
            text: line2,
            y: y2,
            fontSize: size2,
            family: font.family,
            tracking: font.tracking,
            uid,
          }}
        />
      )}
    </g>
  );
}
