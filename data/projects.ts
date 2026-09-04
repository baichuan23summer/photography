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

export type PhotoGroup = {
  type: "group";
  photos: [Photo, Photo, Photo];
  label: string;
  spaceBefore?: PhotoSpacing;
};

export type SequenceItem = Photo | PhotoPair | PhotoGroup;

export type Project = {
  slug: string;
  title: string;
  year?: string;
  description?: string;
  cover: Photo;
  photos: SequenceItem[];
};

const fiestaPhoto = (
  number: string,
  alt: string,
  width = 3000,
  height = 2000,
): Photo => ({
  src: `/photos/old-spanish-days-fiesta/img_${number}.webp`,
  alt,
  width,
  height,
});

const opening = fiestaPhoto("0960", "A guitarist sitting on an illuminated snail sculpture at Fiesta");

export const projects: Project[] = [
  {
    slug: "old-spanish-days-fiesta",
    title: "Old Spanish Days Fiesta",
    year: "2026",
    description: "Santa Barbara · August 7–8",
    cover: opening,
    photos: [
      { ...opening, layout: "wide" },
      {
        type: "group",
        label: "People dancing",
        spaceBefore: "standard",
        photos: [
          fiestaPhoto("0948", "People dancing together among the evening Fiesta crowd"),
          fiestaPhoto("0921", "A dancer in a colorful dress raising her hands beneath the trees"),
          fiestaPhoto("0850", "An adult twirling a child beside a festival stall"),
        ],
      },
      {
        ...fiestaPhoto("0834", "A woman in a pink dress seen from behind in the crowd", 2000, 3000),
        layout: "portrait",
        spaceBefore: "generous",
      },
      {
        type: "pair",
        align: "center",
        spaceBefore: "generous",
        photos: [
          fiestaPhoto("0697", "Two people in decorated hats embracing at Fiesta"),
          fiestaPhoto("0755", "A woman with a flower in her hair facing a man in a white hat"),
        ],
      },
      {
        ...fiestaPhoto("0221", "Friends gathered closely beneath falling confetti", 3000, 1684),
        layout: "wide",
        spaceBefore: "generous",
      },
      {
        ...fiestaPhoto("0273", "Rows of colorful decorated eggs on a striped market table", 3000, 1684),
        layout: "normal",
        spaceBefore: "standard",
      },
      {
        ...fiestaPhoto("0288", "Musicians and an instrument strap in the evening shadows", 3000, 1684),
        layout: "normal",
        spaceBefore: "standard",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
