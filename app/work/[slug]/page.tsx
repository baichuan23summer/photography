import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoSequence } from "@/components/PhotoSequence";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { assetPath } from "@/lib/paths";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const projectImage = publicSiteUrl
    ? new URL(assetPath(project.cover.src), publicSiteUrl).toString()
    : undefined;

  return {
    title: project.title,
    description: project.description ?? `${project.title}, a photographic series by ${site.name}.`,
    openGraph: {
      title: `${project.title} — ${site.displayName}`,
      description: project.description,
      images: projectImage
        ? [
            {
              url: projectImage,
              width: project.cover.width,
              height: project.cover.height,
              alt: project.cover.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.displayName}`,
      description: project.description,
      images: projectImage ? [projectImage] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="project-page">
      <header className="project-heading">
        <div>
          <p className="eyebrow">Series {String(projectIndex + 1).padStart(2, "0")}</p>
          <h1>{project.title}</h1>
          {project.year && <p className="project-year">{project.year}</p>}
        </div>
        {project.description && <p className="project-description">{project.description}</p>}
      </header>

      <PhotoSequence items={project.photos} />

      {projects.length > 1 && (
        <nav className="next-project" aria-label="Next project">
          <span>Next series</span>
          <Link href={`/work/${nextProject.slug}/`}>
            {nextProject.title} <span aria-hidden="true">→</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
