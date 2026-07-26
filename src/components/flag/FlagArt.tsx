"use client";

import { useId } from "react";
import {
  FLAG_H,
  FLAG_W,
  bandOffsets,
  starPoints,
  type FlagLayer,
  type FlagSpec,
} from "@/lib/flag-spec";

/**
 * Traduit une couche de `FlagSpec` en SVG.
 *
 * Convention : les rayons et épaisseurs sont relatifs à la HAUTEUR du
 * drapeau (comme en vexillologie), les positions horizontales à sa LARGEUR.
 */
function Layer({ layer, uid, index }: { layer: FlagLayer; uid: string; index: number }) {
  switch (layer.k) {
    case "bands": {
      const offsets = bandOffsets(layer.bands);
      return (
        <>
          {layer.bands.map((band, i) => {
            const [start, size] = offsets[i];
            return layer.dir === "v" ? (
              <rect
                key={i}
                x={start * FLAG_W}
                y={0}
                width={size * FLAG_W + 0.5}
                height={FLAG_H}
                fill={band.c}
              />
            ) : (
              <rect
                key={i}
                x={0}
                y={start * FLAG_H}
                width={FLAG_W}
                height={size * FLAG_H + 0.5}
                fill={band.c}
              />
            );
          })}
        </>
      );
    }

    case "rect":
      return (
        <rect
          x={layer.x * FLAG_W}
          y={layer.y * FLAG_H}
          width={layer.w * FLAG_W}
          height={layer.h * FLAG_H}
          fill={layer.c}
        />
      );

    case "cross": {
      const thickness = layer.t * FLAG_H;
      const centerX = (layer.x ?? 0.5) * FLAG_W;
      return (
        <>
          {layer.outline && (
            <>
              <rect
                x={0}
                y={FLAG_H / 2 - (layer.outline.t * FLAG_H) / 2}
                width={FLAG_W}
                height={layer.outline.t * FLAG_H}
                fill={layer.outline.c}
              />
              <rect
                x={centerX - (layer.outline.t * FLAG_H) / 2}
                y={0}
                width={layer.outline.t * FLAG_H}
                height={FLAG_H}
                fill={layer.outline.c}
              />
            </>
          )}
          <rect
            x={0}
            y={FLAG_H / 2 - thickness / 2}
            width={FLAG_W}
            height={thickness}
            fill={layer.c}
          />
          <rect
            x={centerX - thickness / 2}
            y={0}
            width={thickness}
            height={FLAG_H}
            fill={layer.c}
          />
        </>
      );
    }

    case "saltire": {
      const diagonals = (color: string, width: number) => (
        <>
          <line
            x1={0}
            y1={0}
            x2={FLAG_W}
            y2={FLAG_H}
            stroke={color}
            strokeWidth={width}
          />
          <line
            x1={FLAG_W}
            y1={0}
            x2={0}
            y2={FLAG_H}
            stroke={color}
            strokeWidth={width}
          />
        </>
      );
      return (
        <>
          {layer.outline && diagonals(layer.outline.c, layer.outline.t * FLAG_H)}
          {diagonals(layer.c, layer.t * FLAG_H)}
        </>
      );
    }

    case "circle":
      return (
        <circle
          cx={layer.cx * FLAG_W}
          cy={layer.cy * FLAG_H}
          r={layer.r * FLAG_H}
          fill={layer.c ?? "none"}
          stroke={layer.stroke}
          strokeWidth={layer.sw ? layer.sw * FLAG_H : undefined}
        />
      );

    case "star":
      return (
        <polygon
          points={starPoints(
            layer.cx * FLAG_W,
            layer.cy * FLAG_H,
            layer.r * FLAG_H,
            layer.points ?? 5,
            layer.inner ?? 0.382,
            layer.rot ?? 0,
          )}
          fill={layer.c ?? "none"}
          stroke={layer.stroke}
          strokeWidth={layer.sw ? layer.sw * FLAG_H : undefined}
          strokeLinejoin="miter"
        />
      );

    case "crescent": {
      const maskId = `${uid}-crescent-${index}`;
      return (
        <>
          <mask id={maskId}>
            <circle
              cx={layer.cx * FLAG_W}
              cy={layer.cy * FLAG_H}
              r={layer.r * FLAG_H}
              fill="#fff"
            />
            <circle
              cx={layer.cx * FLAG_W + layer.dx * FLAG_W}
              cy={layer.cy * FLAG_H}
              r={layer.cut * FLAG_H}
              fill="#000"
            />
          </mask>
          <rect x={0} y={0} width={FLAG_W} height={FLAG_H} fill={layer.c} mask={`url(#${maskId})`} />
        </>
      );
    }

    case "diamond": {
      const cx = layer.cx * FLAG_W;
      const cy = layer.cy * FLAG_H;
      const rx = layer.rx * FLAG_W;
      const ry = layer.ry * FLAG_H;
      return (
        <polygon
          points={`${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`}
          fill={layer.c}
        />
      );
    }

    case "checker": {
      const cellW = (layer.w * FLAG_W) / layer.cols;
      const cellH = (layer.h * FLAG_H) / layer.rows;
      const cells = [];
      for (let row = 0; row < layer.rows; row++) {
        for (let col = 0; col < layer.cols; col++) {
          cells.push(
            <rect
              key={`${row}-${col}`}
              x={layer.x * FLAG_W + col * cellW}
              y={layer.y * FLAG_H + row * cellH}
              width={cellW + 0.3}
              height={cellH + 0.3}
              fill={(row + col) % 2 === 0 ? layer.a : layer.b}
            />,
          );
        }
      }
      return <>{cells}</>;
    }

    case "starfield": {
      // Semis en quinconce : une étoile une case sur deux, ce qui produit
      // les 50 étoiles du canton américain avec 9 rangées de 11 colonnes.
      const stars = [];
      const stepX = (layer.w * FLAG_W) / (layer.cols - 1);
      const stepY = (layer.h * FLAG_H) / (layer.rows - 1);
      for (let row = 0; row < layer.rows; row++) {
        for (let col = 0; col < layer.cols; col++) {
          if ((row + col) % 2 !== 0) continue;
          stars.push(
            <polygon
              key={`${row}-${col}`}
              points={starPoints(
                layer.x * FLAG_W + col * stepX,
                layer.y * FLAG_H + row * stepY,
                layer.r * FLAG_H,
              )}
              fill={layer.c}
            />,
          );
        }
      }
      return <>{stars}</>;
    }

    case "sun": {
      const cx = layer.cx * FLAG_W;
      const cy = layer.cy * FLAG_H;
      const r = layer.r * FLAG_H;
      const rays = Array.from({ length: layer.rays }, (_, i) => {
        const angle = (i * 360) / layer.rays;
        return (
          <polygon
            key={i}
            points={`${cx - r * 0.22},${cy - r} ${cx + r * 0.22},${cy - r} ${cx},${cy - r * 2}`}
            fill={layer.c}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      });
      return (
        <>
          {rays}
          <circle cx={cx} cy={cy} r={r} fill={layer.c} />
        </>
      );
    }

    case "path":
      return (
        <path
          d={layer.d}
          fill={layer.c ?? "none"}
          stroke={layer.stroke}
          strokeWidth={layer.sw}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      );

    default:
      return null;
  }
}

/**
 * Rend le dessin d'un drapeau, sans tissu ni broderie.
 * À insérer dans un `<svg viewBox="0 0 300 200">`.
 */
export function FlagArt({ spec }: { spec: FlagSpec }) {
  const uid = useId().replace(/:/g, "");
  const clipId = `${uid}-clip`;

  return (
    <g clipPath={`url(#${clipId})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={FLAG_W} height={FLAG_H} />
        </clipPath>
      </defs>
      <rect x={0} y={0} width={FLAG_W} height={FLAG_H} fill={spec.base} />
      {spec.layers.map((layer, index) => (
        <Layer key={index} layer={layer} uid={uid} index={index} />
      ))}
    </g>
  );
}
