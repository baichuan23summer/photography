import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { assetPath } from "@/lib/paths";

export function ProjectPreview({
  project,
  priority = false,
  index,
}: {
  project: Project;
  priority?: boolean;
  index: number;
}) {
  return (
    <article className={`project-preview project-preview-${(index % 3) + 1}`}>
      <Link href={`/recent/${project.slug}/`}>
        <figure>
          <Image
            src={assetPath(project.cover.src)}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 760px) 94vw, 48vw"
            className="project-cover-image"
            priority={priority}
          />
          <figcaption className="project-preview-meta">
            <span>{project.title}</span>
            {project.year && <span>{project.year}</span>}
          </figcaption>
        </figure>
      </Link>
    </article>
  );
}
