"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Shield,
  Target,
  AlertTriangle,
  TrendingUp,
  Building2,
  Swords,
  FileText,
  Download,
  ChevronRight,
  Star,
  BarChart3,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  mockOpportunities,
  mockCaptureStrategy,
  mockAgencyProfile,
  mockVendors,
} from "@/lib/mock-data";
import { AddToProjectDropdown } from "@/components/dashboard/add-to-project-dropdown";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function winColor(score: number): string {
  if (score >= 65) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function winBg(score: number): string {
  if (score >= 65) return "border-emerald-500/30 bg-emerald-500/5";
  if (score >= 40) return "border-amber-500/30 bg-amber-500/5";
  return "border-red-500/30 bg-red-500/5";
}

function recBadgeClass(rec: string): string {
  if (rec === "BID")
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  if (rec === "CONSIDER")
    return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
  return "bg-red-500/20 text-red-400 border border-red-500/30";
}

function typeBadgeClass(type: string): string {
  switch (type) {
    case "OTA":
      return "bg-violet-500/20 text-violet-400 border border-violet-500/30";
    case "SBIR":
      return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
    case "RFP":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30";
  }
}

function priorityClass(priority: string): string {
  switch (priority) {
    case "critical":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    case "high":
      return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    case "medium":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30";
  }
}

function threatLevel(vendor: (typeof mockVendors)[0], opp: (typeof mockOpportunities)[0]): {
  level: string;
  cls: string;
  overlap: string;
} {
  const oppDomains = opp.title.toLowerCase();
  const domainOverlap = vendor.domains.filter((d) =>
    oppDomains.includes(d.toLowerCase().split(" ")[0])
  );
  const overlapPct = Math.min(
    100,
    Math.round((domainOverlap.length / vendor.domains.length) * 100 + parseInt(vendor.avgWinRate) * 0.8)
  );

  if (overlapPct >= 60) return { level: "HIGH", cls: "text-red-400", overlap: `${overlapPct}%` };
  if (overlapPct >= 30) return { level: "MEDIUM", cls: "text-amber-400", overlap: `${overlapPct}%` };
  return { level: "LOW", cls: "text-emerald-400", overlap: `${overlapPct}%` };
}

// ─── Add to Project (large variant for detail page) ─────────────────────────

function AddToProjectDropdownLarge({ opportunityId }: { opportunityId: string }) {
  return (
    <div className="inline-flex">
      <AddToProjectDropdown opportunityId={opportunityId} />
    </div>
  );
}

// ─── Similar contracts mock data ──────────────────────────────────────────────

const similarContracts = [
  { name: "Tactical ISR Edge Platform (TISA)", agency: "Army PEO IEW&S", value: "$7.8M", year: 2025 },
  { name: "Multi-INT Fusion Processor", agency: "DIA", value: "$6.4M", year: 2024 },
  { name: "Deployable SIGINT Analytics", agency: "NSA/CSS", value: "$9.2M", year: 2025 },
  { name: "Edge AI for ISR — Phase II", agency: "DARPA", value: "$5.1M", year: 2024 },
];

const relatedOpps = mockOpportunities.slice(1, 4);

// ─── Page Component ───────────────────────────────────────────────────────────

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const opp = mockOpportunities.find((o) => o.id === id) ?? mockOpportunities[0];
  const strategy = mockCaptureStrategy;
  const agency = mockAgencyProfile;
  const remaining = daysUntil(opp.dueDate);

  return (
    <div className="min-h-screen">
      {/* ── Back Navigation ──────────────────────────────────────────────── */}
      <Link
        href="/dashboard"
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Search
      </Link>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className={typeBadgeClass(opp.type)}>{opp.type}</Badge>
          {opp.setAside && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {opp.setAside}
            </Badge>
          )}
          <Badge className="bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 uppercase tracking-wider text-[10px]">
            {opp.status}
          </Badge>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {opp.id}
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {opp.title}
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {opp.agency}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Due {opp.dueDate}
          </span>
          <span
            className={`flex items-center gap-1.5 font-mono font-semibold ${
              remaining <= 7
                ? "text-red-400"
                : remaining <= 14
                  ? "text-amber-400"
                  : "text-muted-foreground"
            }`}
          >
            <Clock className="h-4 w-4" />
            {remaining > 0 ? `${remaining} days remaining` : "OVERDUE"}
          </span>
          <span className="flex items-center gap-1.5 font-mono font-semibold text-emerald-400">
            <DollarSign className="h-4 w-4" />
            {opp.value}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-500 border-emerald-500/30">
            <Target className="h-4 w-4 mr-1.5" />
            Start Capture
          </Button>
          <AddToProjectDropdownLarge opportunityId={opp.id} />
        </div>
      </div>

      {/* ── Main Grid: Content + Sidebar ─────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* ── Left: Main content ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* ── Win Score Hero ──────────────────────────────────────── */}
          <Card className={`${winBg(opp.winProbability)} border`}>
            <CardContent className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:items-start sm:gap-8">
              {/* Score circle */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-28 w-28 items-center justify-center rounded-full border-2 ${
                    opp.winProbability >= 65
                      ? "border-emerald-500/40"
                      : opp.winProbability >= 40
                        ? "border-amber-500/40"
                        : "border-red-500/40"
                  } bg-background/50`}
                >
                  <span
                    className={`font-mono text-4xl font-bold ${winColor(opp.winProbability)}`}
                  >
                    {opp.winProbability}
                  </span>
                </div>
                <Badge className={`${recBadgeClass(opp.recommendation)} text-xs font-bold tracking-wider px-3`}>
                  {opp.recommendation}
                </Badge>
              </div>

              {/* Match reasons */}
              <div className="flex-1">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Win Probability Analysis
                </h3>
                <ul className="space-y-2">
                  {opp.matchReasons.map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* ── Tabbed Content ─────────────────────────────────────── */}
          <Tabs defaultValue="intelligence">
            <TabsList className="w-full justify-start gap-0 bg-muted/30 border border-border/50 rounded-lg p-1">
              <TabsTrigger value="intelligence" className="gap-1.5 text-xs sm:text-sm">
                <Shield className="h-3.5 w-3.5" />
                Intelligence
              </TabsTrigger>
              <TabsTrigger value="capture" className="gap-1.5 text-xs sm:text-sm">
                <Target className="h-3.5 w-3.5" />
                Capture Strategy
              </TabsTrigger>
              <TabsTrigger value="pricing" className="gap-1.5 text-xs sm:text-sm">
                <DollarSign className="h-3.5 w-3.5" />
                Pricing Intel
              </TabsTrigger>
              <TabsTrigger value="evaluation" className="gap-1.5 text-xs sm:text-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                Evaluation Factors
              </TabsTrigger>
            </TabsList>

            {/* ─── Tab 1: Intelligence ───────────────────────────── */}
            <TabsContent value="intelligence" className="mt-4 space-y-4">
              {/* Incumbent Analysis */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Swords className="h-4 w-4 text-primary" />
                    Incumbent Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {opp.incumbent ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            Current Holder
                          </div>
                          <div className="font-mono text-sm font-semibold text-foreground">
                            {opp.incumbent}
                          </div>
                        </div>
                        <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            Contract Duration
                          </div>
                          <div className="font-mono text-sm font-semibold text-foreground">
                            3+ years (est.)
                          </div>
                        </div>
                        <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            Displacement Likelihood
                          </div>
                          <div className={`font-mono text-sm font-bold ${
                            opp.incumbentWeakness ? "text-emerald-400" : "text-red-400"
                          }`}>
                            {opp.incumbentWeakness ? "HIGH" : "LOW"}
                          </div>
                        </div>
                      </div>
                      {opp.incumbentWeakness && (
                        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                                Weakness Assessment
                              </div>
                              <p className="text-sm text-foreground/80">
                                {opp.incumbentWeakness}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                      <div className="text-sm font-semibold text-emerald-400">
                        No Incumbent — New Requirement
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Open competition. No displacement required.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Agency Profile */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Building2 className="h-4 w-4 text-primary" />
                    Agency Profile
                  </CardTitle>
                  <CardDescription>{agency.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        Evaluation Style
                      </div>
                      <div className="font-mono text-sm font-bold text-foreground">
                        {agency.evaluationStyle}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        SB Award Rate
                      </div>
                      <div className="font-mono text-sm font-bold text-emerald-400">
                        {agency.smallBusinessRate}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        Avg Award Time
                      </div>
                      <div className="font-mono text-sm font-bold text-foreground">
                        {agency.avgAwardTime}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        Recent Awards
                      </div>
                      <div className="font-mono text-sm font-bold text-foreground">
                        {agency.recentAwards}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitive Landscape */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-primary" />
                    Competitive Landscape
                  </CardTitle>
                  <CardDescription>
                    {opp.competitorCount} likely competitors identified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30 hover:bg-transparent">
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Competitor
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Win Rate
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Domain Overlap
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Threat Level
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockVendors.map((vendor) => {
                        const threat = threatLevel(vendor, opp);
                        return (
                          <TableRow
                            key={vendor.id}
                            className="border-border/20 hover:bg-muted/20"
                          >
                            <TableCell className="font-medium text-foreground">
                              {vendor.name}
                            </TableCell>
                            <TableCell className="font-mono text-muted-foreground">
                              {vendor.avgWinRate}
                            </TableCell>
                            <TableCell className="font-mono text-muted-foreground">
                              {threat.overlap}
                            </TableCell>
                            <TableCell>
                              <span className={`font-mono text-xs font-bold ${threat.cls}`}>
                                {threat.level}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Tab 2: Capture Strategy ───────────────────────── */}
            <TabsContent value="capture" className="mt-4 space-y-4">
              {/* Win Themes */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Win Themes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.winThemes.map((theme, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-3 text-sm text-foreground/80"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-mono text-[10px] font-bold text-emerald-400">
                          {i + 1}
                        </span>
                        {theme}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Differentiators */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Star className="h-4 w-4 text-amber-400" />
                    Differentiators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.differentiators.map((diff, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                        {diff}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Ghosting Points */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Swords className="h-4 w-4 text-red-400" />
                    Ghosting Points
                  </CardTitle>
                  <CardDescription>
                    Strategic positioning against incumbent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.ghostingPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/5 p-3 text-sm text-foreground/80"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Actions */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Clock className="h-4 w-4 text-primary" />
                    Key Actions Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {strategy.keyActions
                      .sort(
                        (a, b) =>
                          new Date(a.deadline).getTime() -
                          new Date(b.deadline).getTime()
                      )
                      .map((action, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-lg border border-border/30 bg-muted/10 p-3"
                        >
                          <Badge className={`${priorityClass(action.priority)} shrink-0 text-[10px] uppercase tracking-wider font-bold`}>
                            {action.priority}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground/80">
                              {action.action}
                            </p>
                          </div>
                          <span className="shrink-0 font-mono text-xs text-muted-foreground">
                            {action.deadline}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Tab 3: Pricing Intel ──────────────────────────── */}
            <TabsContent value="pricing" className="mt-4 space-y-4">
              {/* Price Range Visualization */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    Price-to-Win Range
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Visual range bar */}
                    <div className="relative pt-8 pb-2">
                      {/* Bar background */}
                      <div className="h-3 w-full rounded-full bg-muted/30 border border-border/30 overflow-hidden">
                        {/* Colored range */}
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500/60 via-emerald-500/60 to-amber-500/60"
                          style={{ marginLeft: "15%", width: "70%" }}
                        />
                      </div>
                      {/* Low marker */}
                      <div className="absolute left-[15%] -translate-x-1/2 top-0 flex flex-col items-center">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {strategy.pricingRange.low}
                        </span>
                        <div className="mt-1 h-4 w-px bg-amber-500/40" />
                      </div>
                      {/* Target marker */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {strategy.pricingRange.target}
                        </span>
                        <div className="mt-1 h-4 w-px bg-emerald-500/60" />
                      </div>
                      {/* High marker */}
                      <div className="absolute left-[85%] -translate-x-1/2 top-0 flex flex-col items-center">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {strategy.pricingRange.high}
                        </span>
                        <div className="mt-1 h-4 w-px bg-amber-500/40" />
                      </div>
                    </div>
                    {/* Labels */}
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span>Floor</span>
                      <span className="text-emerald-400 font-semibold">
                        Target
                      </span>
                      <span>Ceiling</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price-to-Win Recommendation */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4 text-primary" />
                    Price-to-Win Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <p className="text-sm leading-relaxed text-foreground/80">
                      Price at target ({strategy.pricingRange.target}) -- competitive
                      but not lowest bidder. This is a{" "}
                      <span className="font-semibold text-foreground">
                        Best Value
                      </span>{" "}
                      evaluation, allowing technical superiority to offset moderate
                      pricing. Position the price narrative around{" "}
                      <span className="font-semibold text-foreground">
                        total lifecycle cost savings
                      </span>{" "}
                      from edge processing (reduced SATCOM bandwidth, fewer deployed
                      analysts). Underbidding risks signaling inadequate staffing to
                      evaluators.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Contracts Table */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <FileText className="h-4 w-4 text-primary" />
                    Similar Contract Awards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30 hover:bg-transparent">
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Contract
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Agency
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Awarded Value
                        </TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Year
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {similarContracts.map((contract, i) => (
                        <TableRow
                          key={i}
                          className="border-border/20 hover:bg-muted/20"
                        >
                          <TableCell className="font-medium text-foreground">
                            {contract.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {contract.agency}
                          </TableCell>
                          <TableCell className="font-mono text-emerald-400">
                            {contract.value}
                          </TableCell>
                          <TableCell className="font-mono text-muted-foreground">
                            {contract.year}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── Tab 4: Evaluation Factors ─────────────────────── */}
            <TabsContent value="evaluation" className="mt-4 space-y-4">
              {/* Evaluation Factors Table */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Evaluation Factors & Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strategy.evaluationFactors.map((factor, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border/30 bg-muted/10 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-semibold text-foreground text-sm">
                            {factor.factor}
                          </h4>
                          <Badge className="bg-primary/20 text-primary border border-primary/30 font-mono text-xs font-bold">
                            {factor.weight}
                          </Badge>
                        </div>
                        <Progress
                          value={parseInt(factor.weight)}
                          className="mb-3 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-indicator]]:bg-primary/60"
                        />
                        <p className="text-sm leading-relaxed text-foreground/70">
                          {factor.strategy}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Agency Evaluation Tips */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    Agency Evaluation Tips
                  </CardTitle>
                  <CardDescription>
                    Based on {agency.name} historical patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      This agency uses <span className="font-semibold text-foreground">{agency.evaluationStyle}</span> evaluation -- technical excellence can outweigh price.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      Small business award rate of {agency.smallBusinessRate} indicates active commitment to SB participation.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      Average award timeline is {agency.avgAwardTime} from solicitation close -- plan resources accordingly.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      Past performance is weighted heavily -- ensure PPQs are submitted early and reference PMs are briefed.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      Oral presentations may be required -- prepare 15-minute technical brief with live demo capability.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Right Sidebar ──────────────────────────────────────────── */}
        <div className="w-full shrink-0 space-y-4 lg:w-80 xl:w-96">
          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm"
              >
                <FileText className="h-4 w-4 text-primary" />
                Generate Compliance Matrix
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm"
              >
                <FileText className="h-4 w-4 text-primary" />
                Draft Exec Summary
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm"
              >
                <Download className="h-4 w-4 text-primary" />
                Export Intel Report
              </Button>
            </CardContent>
          </Card>

          {/* Key Dates Timeline */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-4 w-4 text-primary" />
                Key Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4 pl-4 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-border/50">
                <div className="relative">
                  <div className="absolute -left-4 top-1 h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Posted
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {opp.postedDate}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-1 h-2 w-2 rounded-full bg-amber-500/60" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Questions Deadline
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {(() => {
                      const posted = new Date(opp.postedDate);
                      const due = new Date(opp.dueDate);
                      const mid = new Date(
                        posted.getTime() +
                          (due.getTime() - posted.getTime()) * 0.4
                      );
                      return mid.toISOString().split("T")[0];
                    })()}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    RFI Response Due
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {(() => {
                      const posted = new Date(opp.postedDate);
                      const due = new Date(opp.dueDate);
                      const mid = new Date(
                        posted.getTime() +
                          (due.getTime() - posted.getTime()) * 0.6
                      );
                      return mid.toISOString().split("T")[0];
                    })()}
                  </div>
                </div>
                <div className="relative">
                  <div className={`absolute -left-4 top-1 h-2 w-2 rounded-full ${
                    remaining <= 7 ? "bg-red-500" : "bg-emerald-500"
                  }`} />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Proposal Due
                  </div>
                  <div className={`font-mono text-xs font-bold ${
                    remaining <= 7 ? "text-red-400" : "text-emerald-400"
                  }`}>
                    {opp.dueDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Opportunities */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Related Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedOpps.map((related) => (
                <Link
                  key={related.id}
                  href={`/dashboard/opportunities/${related.id}`}
                  className="group block rounded-lg border border-border/30 bg-muted/10 p-3 transition-colors hover:bg-muted/30 hover:border-border/50"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`font-mono text-lg font-bold ${winColor(related.winProbability)}`}>
                      {related.winProbability}
                    </span>
                    <Badge className={`${recBadgeClass(related.recommendation)} text-[10px]`}>
                      {related.recommendation}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{related.agency}</span>
                    <span className="font-mono">{related.value}</span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Requirement Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {opp.description}
              </p>
              <Separator className="my-3" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">NAICS</span>
                <span className="font-mono font-semibold text-foreground">
                  {opp.naics}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
