import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { assetPath } from "@/lib/paths";

const coverClasses = ["home-wide", "home-portrait", "home-square", "home-landscape", "home-tall"];

export default function HomePage() {
  return (
    <section className="home-gallery" aria-label="Selected recent photography">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/recent/${project.slug}/`}
          className={`home-project ${coverClasses[index % coverClasses.length]}`}
        >
          <figure>
            <Image
              src={assetPath(project.cover.src)}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes={
                index === 0
                  ? "(max-width: 760px) 100vw, 82vw"
                  : "(max-width: 760px) 100vw, 48vw"
              }
              priority={index < 2}
            />
            <figcaption>
              <span>{project.title}</span>
              {project.year && <span>{project.year}</span>}
            </figcaption>
          </figure>
        </Link>
      ))}
    </section>
  );
}
