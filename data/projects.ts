export type PhotoLayout = "wide" | "normal" | "portrait" | "small";
export type PhotoSpacing = "compact" | "standard" | "generous";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  date?: string;
  location?: string;
  layout?: PhotoLayout;
  spaceBefore?: PhotoSpacing;
};

export type PhotoPair = {
  type: "pair";
  photos: [Photo, Photo];
  align?: "start" | "center" | "end";
  spaceBefore?: PhotoSpacing;
};

export type SequenceItem = Photo | PhotoPair;

export type Project = {
  slug: string;
  title: string;
  year?: string;
  description?: string;
  cover: Photo;
  photos: SequenceItem[];
};

const sample = {
  coast: {
    src: "/photos/sample/coast.webp",
    alt: "A coastal path disappearing into morning fog",
    width: 1536,
    height: 1024,
  },
  bus: {
    src: "/photos/sample/bus.webp",
    alt: "A passenger seen through a rain-covered bus window at dusk",
    width: 1024,
    height: 1536,
  },
  breakfast: {
    src: "/photos/sample/breakfast.webp",
    alt: "Tea cups, plates, and a folded newspaper after breakfast",
    width: 1254,
    height: 1254,
  },
  gasStation: {
    src: "/photos/sample/gas-station.webp",
    alt: "An empty gas station reflected in wet pavement at night",
    width: 1536,
    height: 1024,
  },
  dumplings: {
    src: "/photos/sample/dumplings.webp",
    alt: "Two generations of hands folding dumplings together",
    width: 1448,
    height: 1086,
  },
  stairwell: {
    src: "/photos/sample/stairwell.webp",
    alt: "Palm shadows crossing a concrete stairwell",
    width: 1024,
    height: 1536,
  },
  fogRoad: {
    src: "/photos/sample/fog-road.webp",
    alt: "A quiet road and bare tree disappearing into winter fog",
    width: 1672,
    height: 941,
  },
  portrait: {
    src: "/photos/sample/curtain-portrait.webp",
    alt: "A person standing quietly behind a translucent curtain",
    width: 1122,
    height: 1402,
  },
} satisfies Record<string, Photo>;

export const projects: Project[] = [
  {
    slug: "family",
    title: "Family",
    year: "2026",
    description: "Small rituals, shared rooms, and the gestures that hold a home together.",
    cover: { ...sample.dumplings, layout: "wide" },
    photos: [
      { ...sample.dumplings, layout: "wide", caption: "At the kitchen table, 2026" },
      { ...sample.breakfast, layout: "small", spaceBefore: "generous" },
      {
        type: "pair",
        align: "center",
        spaceBefore: "generous",
        photos: [
          { ...sample.portrait, layout: "portrait" },
          { ...sample.stairwell, layout: "portrait" },
        ],
      },
      { ...sample.coast, layout: "normal", spaceBefore: "generous", caption: "California, 2026" },
      { ...sample.bus, layout: "portrait", spaceBefore: "standard" },
    ],
  },
  {
    slug: "night",
    title: "Night",
    year: "2026",
    description: "Passing lights and the long intervals between destinations.",
    cover: { ...sample.gasStation, layout: "wide" },
    photos: [
      { ...sample.gasStation, layout: "wide", caption: "After rain" },
      { ...sample.bus, layout: "portrait", spaceBefore: "generous" },
      {
        type: "pair",
        spaceBefore: "generous",
        photos: [
          { ...sample.fogRoad, layout: "normal" },
          { ...sample.coast, layout: "normal" },
        ],
      },
      { ...sample.stairwell, layout: "small", spaceBefore: "generous" },
      { ...sample.portrait, layout: "portrait", spaceBefore: "standard" },
    ],
  },
  {
    slug: "people",
    title: "People",
    year: "2025—26",
    description: "Nearness, distance, and the shape of a person in a room.",
    cover: { ...sample.portrait, layout: "portrait" },
    photos: [
      { ...sample.portrait, layout: "portrait" },
      { ...sample.dumplings, layout: "wide", spaceBefore: "generous" },
      {
        type: "pair",
        align: "end",
        spaceBefore: "generous",
        photos: [
          { ...sample.bus, layout: "portrait" },
          { ...sample.breakfast, layout: "normal" },
        ],
      },
      { ...sample.coast, layout: "normal", spaceBefore: "generous" },
      { ...sample.stairwell, layout: "portrait", spaceBefore: "compact" },
    ],
  },
  {
    slug: "places",
    title: "Places",
    year: "2025—26",
    description: "Edges of California, remembered as weather, distance, and light.",
    cover: { ...sample.coast, layout: "wide" },
    photos: [
      { ...sample.coast, layout: "wide", caption: "Central Coast, California" },
      { ...sample.fogRoad, layout: "normal", spaceBefore: "generous" },
      {
        type: "pair",
        spaceBefore: "standard",
        photos: [
          { ...sample.stairwell, layout: "portrait" },
          { ...sample.bus, layout: "portrait" },
        ],
      },
      { ...sample.gasStation, layout: "wide", spaceBefore: "generous" },
      { ...sample.breakfast, layout: "small", spaceBefore: "generous" },
    ],
  },
  {
    slug: "studies",
    title: "Studies",
    year: "2025",
    description: "Exercises in scale, shadow, texture, and stillness.",
    cover: { ...sample.stairwell, layout: "portrait" },
    photos: [
      { ...sample.stairwell, layout: "portrait" },
      { ...sample.breakfast, layout: "small", spaceBefore: "generous" },
      {
        type: "pair",
        align: "center",
        spaceBefore: "generous",
        photos: [
          { ...sample.coast, layout: "normal" },
          { ...sample.fogRoad, layout: "normal" },
        ],
      },
      { ...sample.portrait, layout: "portrait", spaceBefore: "generous" },
      { ...sample.gasStation, layout: "wide", spaceBefore: "standard" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
