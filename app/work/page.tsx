import type { Metadata } from "next";
import { ProjectPreview } from "@/components/ProjectPreview";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Photographic series by ${site.displayName}.`,
};

export default function WorkPage() {
  return (
    <section className="page-shell" aria-labelledby="work-title">
      <header className="page-heading">
        <h1 id="work-title">Work</h1>
        <p>{String(projects.length).padStart(2, "0")} series</p>
      </header>
      <div className="work-grid">
        {projects.map((project, index) => (
          <ProjectPreview
            key={project.slug}
            project={project}
            index={index}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}
