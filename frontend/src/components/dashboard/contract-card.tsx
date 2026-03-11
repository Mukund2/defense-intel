"use client";

import Link from "next/link";
import {
  DollarSign,
  Calendar,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AddToProjectDropdown } from "@/components/dashboard/add-to-project-dropdown";
import type { Opportunity } from "@/lib/mock-data";

const TYPE_COLORS: Record<string, string> = {
  RFP: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SBIR: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  OTA: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Sources Sought": "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

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

function recBadge(rec: "BID" | "CONSIDER" | "SKIP") {
  const map = {
    BID: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    CONSIDER: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    SKIP: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return map[rec];
}

export function ContractCard({ opp }: { opp: Opportunity }) {
  return (
    <Card className="transition-colors hover:bg-card/80 hover:ring-primary/20">
      <CardContent className="space-y-3">
        {/* Top row: badges */}
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
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            {opp.id}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/dashboard/opportunities/${opp.id}`}
          className="group/link block"
        >
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover/link:text-primary transition-colors">
            {opp.title}
          </h3>
        </Link>

        {/* Agency */}
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3 shrink-0" />
          {opp.agency}
        </p>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {opp.description}
        </p>

        <Separator />

        {/* Middle row: win probability + recommendation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
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

          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${recBadge(opp.recommendation)}`}
          >
            {opp.recommendation}
          </span>

          <div className="ml-auto hidden flex-wrap gap-1 sm:flex">
            {opp.matchReasons.slice(0, 2).map((reason) => (
              <Badge key={reason} variant="secondary" className="text-[10px] font-normal">
                {reason}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom row: value, due date, competitors, actions */}
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
            <AddToProjectDropdown opportunityId={opp.id} />
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
