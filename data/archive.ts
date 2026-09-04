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
        src: "/photos/sample/curtain-portrait.webp",
        alt: "A person standing quietly behind a translucent curtain",
        width: 1122,
        height: 1402,
        date: "2026-06-18",
        location: "California",
      },
      {
        src: "/photos/sample/coast.webp",
        alt: "A coastal path disappearing into morning fog",
        width: 1536,
        height: 1024,
        date: "2026-04-02",
        location: "Central Coast",
        caption: "Morning fog",
      },
      {
        src: "/photos/sample/dumplings.webp",
        alt: "Two generations of hands folding dumplings together",
        width: 1448,
        height: 1086,
        date: "2026-02-10",
        caption: "At the kitchen table",
      },
      {
        src: "/photos/sample/bus.webp",
        alt: "A passenger seen through a rain-covered bus window at dusk",
        width: 1024,
        height: 1536,
        date: "2026-01-24",
        location: "Santa Barbara",
      },
    ],
  },
  {
    year: "2025",
    photos: [
      {
        src: "/photos/sample/fog-road.webp",
        alt: "A quiet road and bare tree disappearing into winter fog",
        width: 1672,
        height: 941,
        date: "2025-12-03",
        caption: "Between towns",
      },
      {
        src: "/photos/sample/stairwell.webp",
        alt: "Palm shadows crossing a concrete stairwell",
        width: 1024,
        height: 1536,
        date: "2025-09-16",
        location: "California",
      },
      {
        src: "/photos/sample/breakfast.webp",
        alt: "Tea cups, plates, and a folded newspaper after breakfast",
        width: 1254,
        height: 1254,
        date: "2025-05-08",
        caption: "After breakfast",
      },
      {
        src: "/photos/sample/gas-station.webp",
        alt: "An empty gas station reflected in wet pavement at night",
        width: 1536,
        height: 1024,
        date: "2025-02-19",
        caption: "After rain",
      },
    ],
  },
];
