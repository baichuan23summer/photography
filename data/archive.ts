import type { Photo } from "./projects";

export type ArchiveYear = {
  year: string;
  photos: Photo[];
};

export const archive: ArchiveYear[] = [
  {
    year: "2026",
    photos: [
      {
        src: "/photos/archive/2026/img_0513.webp",
        alt: "Flames rising from a pan on a busy kitchen stove",
        width: 3000,
        height: 2000,
        date: "2026-08-08",
      },
      {
        src: "/photos/archive/2026/img_0158.webp",
        alt: "Sunlit dry grass framed by the concrete openings of a shaded building",
        width: 3000,
        height: 2000,
        date: "2026-08-06",
      },
    ],
  },
];
