import type { Metadata } from "next";
import { ArchiveGallery } from "@/components/ArchiveGallery";
import { archive } from "@/data/archive";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Archive",
  description: `A chronological visual diary by ${site.displayName}.`,
};

export default function ArchivePage() {
  return (
    <section className="page-shell archive-page" aria-labelledby="archive-title">
      <header className="page-heading archive-heading">
        <h1 id="archive-title">Archive</h1>
        <p>A visual diary, arranged by year.</p>
      </header>

      {archive.map((group) => (
        <section className="archive-year" key={group.year} aria-labelledby={`year-${group.year}`}>
          <h2 id={`year-${group.year}`}>{group.year}</h2>
          <ArchiveGallery photos={group.photos} />
        </section>
      ))}
    </section>
  );
}
