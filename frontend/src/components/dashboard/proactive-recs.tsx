"use client";

import Link from "next/link";
import { Zap, ArrowRight, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOpportunities } from "@/lib/mock-data";

// Pick the top 3 by win probability with BID recommendation
const topOpps = mockOpportunities
  .filter((o) => o.recommendation === "BID")
  .sort((a, b) => b.winProbability - a.winProbability)
  .slice(0, 3);

function winColor(p: number) {
  if (p > 60) return "text-emerald-400";
  if (p > 30) return "text-amber-400";
  return "text-red-400";
}

export function ProactiveRecs() {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="size-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-foreground">
          Your best shots this week
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {topOpps.map((opp) => (
          <Link key={opp.id} href={`/dashboard/opportunities/${opp.id}`}>
            <Card className="group cursor-pointer border-border/50 bg-card/60 transition-all hover:border-primary/30 hover:bg-card/80">
              <CardContent className="space-y-2.5 py-3.5 px-4">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xl font-bold ${winColor(opp.winProbability)}`}>
                    {opp.winProbability}%
                  </span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[9px] font-bold">
                    BID
                  </Badge>
                </div>

                <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {opp.title}
                </h3>

                <p className="text-[11px] text-muted-foreground">{opp.agency}</p>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3" />
                    <span className="font-mono">{opp.value}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span className="font-mono">{opp.dueDate}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-medium">View details</span>
                  <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
