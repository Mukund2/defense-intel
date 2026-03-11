"use client";

import Link from "next/link";
import {
  Shield,
  Target,
  Crosshair,
  BarChart3,
  ArrowRight,
  Zap,
  Eye,
  FileText,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  Comparison table data                                              */
/* ------------------------------------------------------------------ */

const comparisonCategories = [
  "Defense-specific",
  "Find contracts",
  "Win probability",
  "Capture intel",
  "Proposal support",
  "Price intel",
  "Accessible pricing",
];

const competitors: { name: string; checks: boolean[] }[] = [
  { name: "Defense Intel", checks: [true, true, true, true, true, true, true] },
  {
    name: "Usul",
    checks: [true, true, false, false, false, false, false],
  },
  {
    name: "GovDash",
    checks: [false, true, false, false, true, false, true],
  },
  {
    name: "GovWin",
    checks: [true, true, false, false, false, false, false],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.25em] text-primary"
          >
            <Shield className="size-5" />
            DEFENSE&nbsp;INTEL
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </div>

          <Link href="/dashboard">
            <Button size="sm">
              Get Started
              <ChevronRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-border/40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Gradient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 text-center md:pt-36 md:pb-32">
          <Badge variant="outline" className="mb-6 gap-1.5 border-primary/30 text-primary">
            <Zap className="size-3" />
            AI-Powered Contract Intelligence
          </Badge>

          <h1 className="mx-auto max-w-3xl font-mono text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-primary">Win</span> Defense Contracts
            <br />
            Your Competitors Can&apos;t
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI-powered contract intelligence for small defense companies. Find
            opportunities, build capture strategies, and submit winning proposals
            &mdash; all in one platform.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="h-11 gap-2 px-6 text-sm font-semibold">
                Start Finding Contracts
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="h-11 px-6 text-sm font-semibold">
                See How It Works
              </Button>
            </a>
          </div>

          <p className="mt-8 font-mono text-xs tracking-wider text-muted-foreground/70">
            TRUSTED BY 50+ DEFENSE COMPANIES
          </p>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border/40 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            {
              value: "81%",
              label: "of contracts receive zero competition",
            },
            {
              value: "$100B+",
              label: "annual DoD small business contracts",
            },
            {
              value: "3x",
              label: "higher win rate with capture intelligence",
            },
          ].map((stat) => (
            <div key={stat.value} className="px-6 py-8 text-center md:py-10">
              <p className="font-mono text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core value prop: Find. Strategize. Win. ──────────── */}
      <section id="features" className="border-b border-border/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs font-semibold tracking-[0.3em] text-primary">
            THE PLATFORM
          </p>
          <h2 className="mt-3 text-center font-mono text-3xl font-bold tracking-tight md:text-4xl">
            Find. Strategize. Win.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            The primes have capture teams. Now you do too.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {/* FIND */}
            <Card className="border-primary/20 bg-card transition-colors hover:border-primary/40">
              <CardContent className="space-y-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary">
                    FIND
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Every defense opportunity, one feed
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    SAM.gov, SBIR, OTA, AFWERX &mdash; unified
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    AI matches opportunities to your capabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Win probability scoring on every contract
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* STRATEGIZE */}
            <Card className="border-primary/20 bg-card transition-colors hover:border-primary/40">
              <CardContent className="space-y-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary">
                    STRATEGIZE
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Capture intelligence, automated
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Incumbent analysis &amp; competitive landscape
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Pricing intelligence &amp; historical data
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Win themes &amp; competitive positioning
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* WIN */}
            <Card className="border-primary/20 bg-card transition-colors hover:border-primary/40">
              <CardContent className="space-y-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Crosshair className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary">
                    WIN
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Proposals that score highest
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    RFP analysis &amp; compliance matrix
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Strategy-informed proposal drafts
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Built-in review &amp; scoring
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-b border-border/40 py-24 md:py-32"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs font-semibold tracking-[0.3em] text-primary">
            HOW IT WORKS
          </p>
          <h2 className="mt-3 text-center font-mono text-3xl font-bold tracking-tight md:text-4xl">
            From zero to winning in four steps
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Build Your Profile",
                desc: "5 minutes. Enter your capabilities, past performance, certifications, and NAICS codes.",
              },
              {
                step: "02",
                icon: BarChart3,
                title: "Get Matched",
                desc: "AI scans every opportunity across SAM.gov, SBIR, OTAs, and more. Ranked by win probability.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Build Capture Strategy",
                desc: "Know the incumbent, the budget, the evaluation criteria. Build your win strategy before you write a word.",
              },
              {
                step: "04",
                icon: Crosshair,
                title: "Submit & Win",
                desc: "Strategy-informed proposals, compliance-checked, reviewed and scored before submission.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center md:text-left">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary md:mx-0">
                  {item.step}
                </div>
                <h3 className="font-mono text-base font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ────────────────────────────────────── */}
      <section id="pricing" className="border-b border-border/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs font-semibold tracking-[0.3em] text-primary">
            COMPARISON
          </p>
          <h2 className="mt-3 text-center font-mono text-3xl font-bold tracking-tight md:text-4xl">
            Why not just use&hellip;
          </h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-mono text-xs tracking-wider text-muted-foreground">
                    FEATURE
                  </th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`px-4 py-3 text-center font-mono text-xs tracking-wider ${
                        c.name === "Defense Intel"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {c.name.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((cat, i) => (
                  <tr
                    key={cat}
                    className={`border-b border-border/50 ${
                      i % 2 === 0 ? "bg-card/30" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-foreground">{cat}</td>
                    {competitors.map((c) => (
                      <td key={c.name + cat} className="px-4 py-3 text-center">
                        {c.checks[i] ? (
                          <span className="inline-block size-5 rounded-full bg-primary/20 text-center font-mono text-xs leading-5 text-primary">
                            &#10003;
                          </span>
                        ) : (
                          <span className="inline-block size-5 rounded-full bg-muted text-center font-mono text-xs leading-5 text-muted-foreground">
                            &times;
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA section ─────────────────────────────────────────── */}
      <section className="border-b border-border/40 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
            Stop losing contracts
            <br />
            <span className="text-primary">you deserve to win.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the small defense companies already using AI-powered capture
            intelligence to compete with the primes.
          </p>
          <div className="mt-10">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 gap-2 px-8 text-sm font-semibold">
                Get Started Free
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.25em] text-muted-foreground">
            <Shield className="size-4" />
            DEFENSE&nbsp;INTEL
          </div>

          <div className="flex gap-6">
            <a
              href="#features"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </div>

          <p className="font-mono text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Defense Intel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
