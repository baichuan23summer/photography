import type { Metadata } from "next";
import { PhotoSequence } from "@/components/PhotoSequence";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Recent",
  description: `${projects[0].title}, photographed by ${site.displayName}.`,
};

export default function RecentPage() {
  const project = projects[0];

  return (
    <article className="project-page recent-page">
      <header className="project-heading">
        <div>
          <p className="eyebrow">Recent</p>
          <h1>{project.title}</h1>
          {project.year && <p className="project-year">{project.year}</p>}
        </div>
        {project.description && <p className="project-description">{project.description}</p>}
      </header>
      <PhotoSequence items={project.photos} />
    </article>
  );
}
