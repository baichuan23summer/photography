"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { Photo, PhotoGroup, PhotoPair, SequenceItem } from "@/data/projects";
import { assetPath } from "@/lib/paths";
import { Lightbox } from "./Lightbox";

function isSet(item: SequenceItem): item is PhotoPair | PhotoGroup {
  return "type" in item;
}

export function PhotoSequence({ items }: { items: SequenceItem[] }) {
  const photos = useMemo(
    () => items.flatMap((item) => (isSet(item) ? item.photos : [item])),
    [items],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  let photoIndex = 0;

  function renderPhoto(photo: Photo, eager = false) {
    const currentIndex = photoIndex++;
    const caption = [photo.location, photo.caption].filter(Boolean).join(" — ");

    return (
      <figure className="sequence-photo" key={`${photo.src}-${currentIndex}`}>
        <button
          className="photo-button"
          type="button"
          onClick={() => setActiveIndex(currentIndex)}
          aria-label={`View full screen: ${photo.alt}`}
        >
          <Image
            src={assetPath(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 760px) 94vw, (max-width: 1200px) 82vw, 1320px"
            className="sequence-image"
            priority={eager}
          />
        </button>
        {caption && <figcaption className="photo-caption">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <>
      <div className="photo-sequence">
        {items.map((item, itemIndex) => {
          if (isSet(item)) {
            return (
              <div
                className={`${item.type === "group" ? "sequence-group" : `sequence-pair align-${item.align ?? "center"}`} spacing-${item.spaceBefore ?? "standard"}`}
                key={`${item.type}-${itemIndex}`}
                role={item.type === "group" ? "group" : undefined}
                aria-label={item.type === "group" ? item.label : undefined}
              >
                {item.photos.map((photo) => renderPhoto(photo))}
              </div>
            );
          }

          return (
            <div
              className={`sequence-single layout-${item.layout ?? "normal"} spacing-${item.spaceBefore ?? "standard"}`}
              key={`${item.src}-${itemIndex}`}
            >
              {renderPhoto(item, itemIndex === 0)}
            </div>
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
