"use client";

import Link from "next/link";
import { mockOpportunities, type Opportunity } from "@/lib/mock-data";
import { useProjects } from "@/contexts/projects-context";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Kanban,
  Target,
  DollarSign,
  Calendar,
  Filter,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Column configuration — 4 columns instead of 5                      */
/* ------------------------------------------------------------------ */

interface ColumnConfig {
  key: string;
  label: string;
  statuses: Opportunity["status"][];
  borderColor: string;
  headerBg: string;
  countBg: string;
}

const columns: ColumnConfig[] = [
  {
    key: "matched",
    label: "Matched",
    statuses: ["matched", "qualified"],
    borderColor: "border-t-zinc-500",
    headerBg: "text-zinc-400",
    countBg: "bg-zinc-500/20 text-zinc-400",
  },
  {
    key: "pursuing",
    label: "Pursuing",
    statuses: ["pursuing"],
    borderColor: "border-t-amber-500",
    headerBg: "text-amber-400",
    countBg: "bg-amber-500/20 text-amber-400",
  },
  {
    key: "submitted",
    label: "Submitted",
    statuses: ["submitted"],
    borderColor: "border-t-purple-500",
    headerBg: "text-purple-400",
    countBg: "bg-purple-500/20 text-purple-400",
  },
  {
    key: "won-lost",
    label: "Won / Lost",
    statuses: ["won", "lost"],
    borderColor: "border-t-emerald-500",
    headerBg: "text-emerald-400",
    countBg: "bg-emerald-500/20 text-emerald-400",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getOpportunitiesForColumn(statuses: Opportunity["status"][]) {
  return mockOpportunities.filter((o) => statuses.includes(o.status));
}

function probabilityColor(score: number) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function parseDollarValue(value: string): number {
  const num = parseFloat(value.replace(/[$,M]/g, ""));
  return isNaN(num) ? 0 : num;
}

function totalPipelineValue(): string {
  const total = mockOpportunities.reduce(
    (acc, o) => acc + parseDollarValue(o.value),
    0
  );
  return `$${total.toFixed(1)}M`;
}

/* ------------------------------------------------------------------ */
/*  Pipeline card with project tag                                     */
/* ------------------------------------------------------------------ */

function PipelineCard({ opp }: { opp: Opportunity }) {
  const { getProjectForOpportunity } = useProjects();
  const project = getProjectForOpportunity(opp.id);

  return (
    <Link href={`/dashboard/opportunities/${opp.id}`}>
      <Card
        size="sm"
        className="cursor-pointer border-border/50 bg-card/80 transition-colors hover:border-border hover:bg-card"
      >
        <CardContent className="space-y-3">
          {/* Project tag */}
          {project && (
            <div className="flex items-center gap-1.5">
              <div className={`size-2 rounded-full ${project.color}`} />
              <span className="text-[10px] font-medium text-muted-foreground">
                {project.name}
              </span>
            </div>
          )}

          {/* Title */}
          <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
            {opp.title}
          </p>

          {/* Agency */}
          <p className="text-xs text-muted-foreground">{opp.agency}</p>

          {/* Value + Win probability */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-sm font-semibold text-foreground">
              <DollarSign className="size-3 text-muted-foreground" />
              {opp.value}
            </span>
            <span
              className={`font-mono text-xs font-bold ${probabilityColor(
                opp.winProbability
              )}`}
            >
              {opp.winProbability}%
            </span>
          </div>

          {/* Due date */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            <span className="font-mono">{opp.dueDate}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className="h-5 border-border/60 px-1.5 text-[10px] font-medium text-muted-foreground"
            >
              {opp.type}
            </Badge>
            {opp.setAside && (
              <Badge
                variant="outline"
                className="h-5 border-primary/30 px-1.5 text-[10px] font-medium text-primary"
              >
                {opp.setAside}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PipelinePage() {
  const winCount = mockOpportunities.filter((o) => o.status === "won").length;
  const closedCount = mockOpportunities.filter(
    (o) => o.status === "won" || o.status === "lost"
  ).length;
  const winRate =
    closedCount > 0 ? Math.round((winCount / closedCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Kanban className="size-5 text-primary" />
            <h1 className="font-mono text-xl font-bold tracking-tight">
              Capture Pipeline
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Track opportunities from discovery to award
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Filter className="size-3" />
            Filter
          </Button>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card size="sm" className="border-border/50">
          <CardContent className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Target className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Total Opportunities
              </p>
              <p className="font-mono text-lg font-bold">
                {mockOpportunities.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="border-border/50">
          <CardContent className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign className="size-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pipeline Value</p>
              <p className="font-mono text-lg font-bold text-emerald-400">
                {totalPipelineValue()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card size="sm" className="border-border/50">
          <CardContent className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="size-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Win Rate</p>
              <p className="font-mono text-lg font-bold text-amber-400">
                {winRate > 0 ? `${winRate}%` : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* ── Kanban board — 4 columns ─────────────────────────── */}
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[900px] gap-4">
          {columns.map((col) => {
            const opps = getOpportunitiesForColumn(col.statuses);

            return (
              <div key={col.key} className="flex-1 min-w-[220px]">
                {/* Column header */}
                <div
                  className={`mb-3 rounded-lg border border-border/50 border-t-2 ${col.borderColor} bg-card/50 px-3 py-2.5`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-semibold tracking-wider ${col.headerBg}`}
                    >
                      {col.label.toUpperCase()}
                    </span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-full font-mono text-[10px] font-bold ${col.countBg}`}
                    >
                      {opps.length}
                    </span>
                  </div>
                </div>

                {/* Column cards */}
                <div className="space-y-3">
                  {opps.length > 0 ? (
                    opps.map((opp) => <PipelineCard key={opp.id} opp={opp} />)
                  ) : (
                    <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border/40 text-xs text-muted-foreground/50">
                      No opportunities
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
