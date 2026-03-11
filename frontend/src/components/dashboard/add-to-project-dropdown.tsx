"use client";

import { FolderPlus, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjects } from "@/contexts/projects-context";

export function AddToProjectDropdown({ opportunityId }: { opportunityId: string }) {
  const { projects, addOpportunityToProject, getProjectForOpportunity } = useProjects();
  const currentProject = getProjectForOpportunity(opportunityId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground h-6"
      >
        <FolderPlus className="size-3" />
        {currentProject ? currentProject.name : "Add to Project"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {projects.map((project) => {
          const isInProject = project.opportunityIds.includes(opportunityId);
          return (
            <DropdownMenuItem
              key={project.id}
              onClick={() => addOpportunityToProject(project.id, opportunityId)}
              className="gap-2 text-xs"
            >
              <div className={`size-2.5 rounded-full ${project.color}`} />
              <span className="flex-1">{project.name}</span>
              {isInProject && <Check className="size-3 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
