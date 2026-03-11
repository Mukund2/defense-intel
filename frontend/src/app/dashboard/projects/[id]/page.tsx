"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FolderOpen,
  DollarSign,
  Calendar,
  Users,
  Building2,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useProjects } from "@/contexts/projects-context";
import { mockOpportunities, type Opportunity } from "@/lib/mock-data";

function winColor(p: number) {
  if (p > 60) return "text-emerald-400";
  if (p > 30) return "text-amber-400";
  return "text-red-400";
}

function winBarColor(p: number) {
  if (p > 60) return "[&_[data-slot=progress-indicator]]:bg-emerald-400";
  if (p > 30) return "[&_[data-slot=progress-indicator]]:bg-amber-400";
  return "[&_[data-slot=progress-indicator]]:bg-red-400";
}

const TYPE_COLORS: Record<string, string> = {
  RFP: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SBIR: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  OTA: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Sources Sought": "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

function recBadge(rec: "BID" | "CONSIDER" | "SKIP") {
  const map = {
    BID: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    CONSIDER: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    SKIP: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return map[rec];
}

function parseDollarValue(value: string): number {
  const num = parseFloat(value.replace(/[$,M]/g, ""));
  return isNaN(num) ? 0 : num;
}

function ProjectContractCard({
  opp,
  projectId,
  onRemove,
}: {
  opp: Opportunity;
  projectId: string;
  onRemove: (projectId: string, oppId: string) => void;
}) {
  return (
    <Card className="transition-colors hover:bg-card/80">
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TYPE_COLORS[opp.type]}`}
          >
            {opp.type}
          </span>
          {opp.setAside && (
            <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              {opp.setAside}
            </span>
          )}
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${recBadge(opp.recommendation)}`}
          >
            {opp.recommendation}
          </span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            {opp.id}
          </span>
        </div>

        <Link
          href={`/dashboard/opportunities/${opp.id}`}
          className="group/link block"
        >
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover/link:text-primary transition-colors">
            {opp.title}
          </h3>
        </Link>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3 shrink-0" />
          {opp.agency}
        </p>

        <div className="flex items-center gap-3">
          <span className={`font-mono text-lg font-bold ${winColor(opp.winProbability)}`}>
            {opp.winProbability}%
          </span>
          <div className="w-20">
            <Progress
              value={opp.winProbability}
              className={`h-1.5 ${winBarColor(opp.winProbability)}`}
            />
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="size-3" />
            <span className="font-mono font-medium text-foreground">{opp.value}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span className="font-mono">{opp.dueDate}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            <span className="font-mono">{opp.competitorCount}</span>
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onRemove(projectId, opp.id)}
              className="text-muted-foreground hover:text-red-400 gap-1 text-[11px]"
            >
              <Trash2 className="size-3" />
              Remove
            </Button>
            <Link
              href={`/dashboard/opportunities/${opp.id}`}
              className="flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
            >
              <span className="text-xs font-medium">Details</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { projects, removeOpportunityFromProject } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted-foreground">Project not found.</p>
        <Link href="/dashboard/projects" className="mt-2 text-sm text-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const opps = mockOpportunities.filter((o) =>
    project.opportunityIds.includes(o.id)
  );
  const totalValue = opps.reduce((acc, o) => acc + parseDollarValue(o.value), 0);

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link
        href="/dashboard/projects"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-12 items-center justify-center rounded-xl ${project.color}/15`}
          >
            <FolderOpen className={`size-6 ${project.color.replace("bg-", "text-")}`} />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold tracking-tight">
              {project.name}
            </h1>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            <span className="font-mono font-semibold text-foreground">{opps.length}</span>{" "}
            contracts
          </span>
          <span className="font-mono font-semibold text-emerald-400">
            ${totalValue.toFixed(1)}M
          </span>
        </div>
      </div>

      <Separator />

      {/* Contracts list */}
      {opps.length > 0 ? (
        <div className="space-y-3">
          {opps.map((opp) => (
            <ProjectContractCard
              key={opp.id}
              opp={opp}
              projectId={project.id}
              onRemove={removeOpportunityFromProject}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No contracts in this project yet. Add some from the search page.
          </p>
        </div>
      )}
    </div>
  );
}
