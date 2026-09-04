import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
};

export default function AboutPage() {
  return (
    <section className="page-shell about-page" aria-labelledby="about-title">
      <h1 id="about-title" className="sr-only">
        About
      </h1>
      <div className="about-layout">
        <figure className="about-portrait">
          <Image
            src={assetPath(site.aboutPhoto.src)}
            alt={site.aboutPhoto.alt}
            width={site.aboutPhoto.width}
            height={site.aboutPhoto.height}
            sizes="(max-width: 800px) 94vw, 47vw"
            priority
          />
        </figure>

        <div className="about-copy">
          <p>{site.bio}</p>
          <div className="about-links" aria-label="Contact links">
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
