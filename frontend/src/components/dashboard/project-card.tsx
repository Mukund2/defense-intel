"use client";

import Link from "next/link";
import { FolderOpen, FileText, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockOpportunities } from "@/lib/mock-data";
import type { Project } from "@/lib/mock-data";
import { useProjects } from "@/contexts/projects-context";

function parseDollarValue(value: string): number {
  const num = parseFloat(value.replace(/[$,M]/g, ""));
  return isNaN(num) ? 0 : num;
}

export function ProjectCard({ project }: { project: Project }) {
  const { deleteProject } = useProjects();
  const opps = mockOpportunities.filter((o) =>
    project.opportunityIds.includes(o.id)
  );
  const totalValue = opps.reduce((acc, o) => acc + parseDollarValue(o.value), 0);

  return (
    <Card className="group transition-colors hover:border-border hover:bg-card/80">
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${project.color}/15`}
            >
              <FolderOpen className={`size-5 ${project.color.replace("bg-", "text-")}`} />
            </div>
            <div>
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {project.name}
              </Link>
              <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="xs"
            onClick={() => deleteProject(project.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FileText className="size-3" />
            <span className="font-mono font-medium text-foreground">{opps.length}</span>
            {opps.length === 1 ? "contract" : "contracts"}
          </span>
          <span className="font-mono font-medium text-foreground">
            ${totalValue.toFixed(1)}M
          </span>
          <span className="ml-auto font-mono text-[10px]">
            Created {project.createdAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
