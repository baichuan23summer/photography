"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/data/projects";
import { assetPath } from "@/lib/paths";

type LightboxProps = {
  photos: Photo[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ photos, index, onChange, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const pointerStartRef = useRef<number | null>(null);
  const photo = photos[index];

  const previous = () => onChange((index - 1 + photos.length) % photos.length);
  const next = () => onChange((index + 1) % photos.length);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${photos.length}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onPointerDown={(event) => {
        pointerStartRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStartRef.current === null) return;
        const distance = event.clientX - pointerStartRef.current;
        if (distance > 55) previous();
        if (distance < -55) next();
        pointerStartRef.current = null;
      }}
    >
      <button
        ref={closeButtonRef}
        className="lightbox-close"
        type="button"
        onClick={onClose}
      >
        Close
      </button>

      {photos.length > 1 && (
        <button
          className="lightbox-previous"
          type="button"
          onClick={previous}
          aria-label="Previous photograph"
        >
          <span aria-hidden="true">←</span>
        </button>
      )}

      <figure className="lightbox-figure">
        <Image
          key={photo.src}
          src={assetPath(photo.src)}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          className="lightbox-image"
          priority
        />
        {(photo.caption || photo.location) && (
          <figcaption className="lightbox-caption">
            {[photo.location, photo.caption].filter(Boolean).join(" — ")}
          </figcaption>
        )}
      </figure>

      {photos.length > 1 && (
        <button
          className="lightbox-next"
          type="button"
          onClick={next}
          aria-label="Next photograph"
        >
          <span aria-hidden="true">→</span>
        </button>
      )}

      <p className="lightbox-count" aria-hidden="true">
        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </p>
    </div>
  );
}
