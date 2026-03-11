"use client";

import { FolderKanban } from "lucide-react";
import { useProjects } from "@/contexts/projects-context";
import { ProjectCard } from "@/components/dashboard/project-card";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";

export default function ProjectsPage() {
  const { projects } = useProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <FolderKanban className="size-5 text-primary" />
            <h1 className="font-mono text-xl font-bold tracking-tight">
              Projects
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize opportunities into focused capture efforts
          </p>
        </div>

        <CreateProjectDialog />
      </div>

      {/* Projects grid */}
      {projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderKanban className="size-12 text-muted-foreground/30 mb-4" />
          <p className="text-sm text-muted-foreground">
            No projects yet. Create one to start organizing your opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
