import Image from "next/image";
import { photoExists, type Photo } from "@/lib/photos";

/**
 * Cadre photo. Si le fichier n'est pas encore livré, on affiche un
 * emplacement annoté avec le sujet attendu et le nom de fichier à déposer —
 * plutôt qu'une image cassée.
 */
export function PhotoFrame({ photo }: { photo: Photo }) {
  const present = photoExists(photo.file);

  return (
    <figure>
      {present ? (
        <div
          className="relative overflow-hidden rounded-card shadow-[0_1px_2px_rgb(21_21_15/0.06),0_24px_50px_-30px_rgb(21_21_15/0.45)]"
          style={{ aspectRatio: photo.ratio }}
        >
          <Image
            src={`/photos/${photo.file}`}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="dashed flex flex-col items-center justify-center gap-2 p-6 text-center"
          style={{ aspectRatio: photo.ratio }}
        >
          <p className="text-sm font-semibold text-ink-soft">{photo.brief}</p>
          <code className="text-xs text-ink-faint">
            public/photos/{photo.file}
          </code>
        </div>
      )}

      <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
