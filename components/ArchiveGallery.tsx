"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Photo } from "@/data/projects";
import { assetPath } from "@/lib/paths";
import { Lightbox } from "./Lightbox";

function formatDate(date?: string) {
  if (!date) return undefined;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ArchiveGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <>
      <div className="archive-grid">
        {photos.map((photo, index) => {
          const details = [formatDate(photo.date), photo.location, photo.caption]
            .filter(Boolean)
            .join(" · ");

          return (
            <figure className="archive-photo" key={`${photo.src}-${index}`}>
              <button
                className="photo-button"
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View full screen: ${photo.alt}`}
              >
                <Image
                  src={assetPath(photo.src)}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 700px) 94vw, (max-width: 1100px) 47vw, 31vw"
                  className="archive-image"
                />
              </button>
              {details && <figcaption className="photo-caption">{details}</figcaption>}
            </figure>
          );
        })}
      </div>

      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          index={activeIndex}
          onChange={setActiveIndex}
          onClose={close}
        />
      )}
    </>
  );
}
