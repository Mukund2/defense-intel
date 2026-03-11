"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Cpu,
  Shield,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Rocket,
  Plus,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Step configuration                                                 */
/* ------------------------------------------------------------------ */

const steps = [
  { label: "Company Info", icon: Building2 },
  { label: "Capabilities", icon: Cpu },
  { label: "Credentials", icon: Shield },
  { label: "Review", icon: CheckCircle2 },
];

/* ------------------------------------------------------------------ */
/*  Preset chip data                                                   */
/* ------------------------------------------------------------------ */

const naicsOptions = [
  { code: "541330", label: "Engineering Services" },
  { code: "541512", label: "Computer Systems Design" },
  { code: "541511", label: "Custom Software Development" },
  { code: "518210", label: "Data Processing & Hosting" },
  { code: "336411", label: "Aircraft Manufacturing" },
  { code: "336414", label: "Guided Missiles & Space Vehicles" },
  { code: "334511", label: "Search & Navigation Equipment" },
];

const capabilityOptions = [
  "Autonomous Systems",
  "Cybersecurity",
  "C4ISR",
  "Electronic Warfare",
  "Space Systems",
  "AI/ML",
  "Logistics",
  "Training & Simulation",
  "Weapons Systems",
  "Intelligence Analysis",
];

const clearanceOptions = [
  "Unclassified",
  "SECRET",
  "TOP SECRET",
  "TS/SCI",
  "SAP",
];

const setAsideOptions = [
  "Small Business",
  "8(a)",
  "HUBZone",
  "SDVOSB",
  "WOSB",
  "Mentor-Protege",
];

const certificationOptions = [
  "ISO 9001",
  "CMMI Level 3",
  "CMMI Level 5",
  "ISO 27001",
  "FedRAMP",
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PastPerformance {
  contractName: string;
  agency: string;
  value: string;
  period: string;
}

interface FormData {
  companyName: string;
  description: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue: string;
  primaryLocation: string;
  website: string;
  selectedNaics: string[];
  selectedCapabilities: string[];
  pastPerformance: PastPerformance[];
  clearances: string[];
  setAsides: string[];
  certifications: string[];
  ueiNumber: string;
  cageCode: string;
}

/* ------------------------------------------------------------------ */
/*  Chip select component                                              */
/* ------------------------------------------------------------------ */

function ChipSelect({
  options,
  selected,
  onToggle,
  getLabel,
}: {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
  getLabel?: (item: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              isSelected
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {isSelected && <CheckCircle2 className="size-3" />}
            {getLabel ? getLabel(option) : option}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox group component                                           */
/* ------------------------------------------------------------------ */

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all ${
              isSelected
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <div
              className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                isSelected
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-muted-foreground/40"
              }`}
            >
              {isSelected && <CheckCircle2 className="size-3 text-background" />}
            </div>
            {option}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    companyName: "",
    description: "",
    foundedYear: "",
    employeeCount: "",
    annualRevenue: "",
    primaryLocation: "",
    website: "",
    selectedNaics: [],
    selectedCapabilities: [],
    pastPerformance: [],
    clearances: [],
    setAsides: [],
    certifications: [],
    ueiNumber: "",
    cageCode: "",
  });

  /* ── State helpers ─────────────────────────────────────────── */

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArrayItem(key: keyof FormData, item: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(item)
          ? arr.filter((i) => i !== item)
          : [...arr, item],
      };
    });
  }

  function addPastPerformance() {
    setForm((prev) => ({
      ...prev,
      pastPerformance: [
        ...prev.pastPerformance,
        { contractName: "", agency: "", value: "", period: "" },
      ],
    }));
  }

  function removePastPerformance(index: number) {
    setForm((prev) => ({
      ...prev,
      pastPerformance: prev.pastPerformance.filter((_, i) => i !== index),
    }));
  }

  function updatePastPerformance(
    index: number,
    field: keyof PastPerformance,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      pastPerformance: prev.pastPerformance.map((pp, i) =>
        i === index ? { ...pp, [field]: value } : pp
      ),
    }));
  }

  /* ── Navigation ────────────────────────────────────────────── */

  function nextStep() {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  }

  function prevStep() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  /* ── Step indicator ────────────────────────────────────────── */

  function StepIndicator() {
    return (
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div key={step.label} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 transition-all ${
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500/20"
                      : isCurrent
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-card/50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-5 text-emerald-400" />
                  ) : (
                    <StepIcon
                      className={`size-4 ${
                        isCurrent ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isCurrent
                      ? "text-foreground"
                      : isCompleted
                      ? "text-emerald-400"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`mb-6 h-px w-16 sm:w-24 ${
                    idx < currentStep ? "bg-emerald-500" : "bg-border/40"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Step 1: Company Info ───────────────────────────────────── */

  function Step1() {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Building2 className="size-5 text-primary" />
            Company Information
          </CardTitle>
          <CardDescription>
            Tell us about your company so we can match you with the right
            opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Company name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Company Name
            </label>
            <Input
              placeholder="e.g. Meridian Defense Systems"
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Company Description
            </label>
            <Textarea
              placeholder="Brief description of your company, core mission, and key differentiators..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Grid: Founded, Employees, Revenue */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Founded Year
              </label>
              <Input
                placeholder="e.g. 2018"
                value={form.foundedYear}
                onChange={(e) => updateField("foundedYear", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Employee Count
              </label>
              <Input
                placeholder="e.g. 45"
                value={form.employeeCount}
                onChange={(e) => updateField("employeeCount", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Annual Revenue
              </label>
              <Input
                placeholder="e.g. $12M"
                value={form.annualRevenue}
                onChange={(e) => updateField("annualRevenue", e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Primary Location
            </label>
            <Input
              placeholder="e.g. Arlington, VA"
              value={form.primaryLocation}
              onChange={(e) => updateField("primaryLocation", e.target.value)}
            />
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Website
            </label>
            <Input
              placeholder="e.g. https://meridiandefense.com"
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ── Step 2: Capabilities ──────────────────────────────────── */

  function Step2() {
    return (
      <div className="space-y-6">
        {/* NAICS Codes */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Cpu className="size-5 text-primary" />
              NAICS Codes
            </CardTitle>
            <CardDescription>
              Select the NAICS codes relevant to your company. These determine
              which contracts you&apos;re eligible for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChipSelect
              options={naicsOptions.map((n) => n.code)}
              selected={form.selectedNaics}
              onToggle={(item) => toggleArrayItem("selectedNaics", item)}
              getLabel={(code) => {
                const match = naicsOptions.find((n) => n.code === code);
                return match ? `${code} — ${match.label}` : code;
              }}
            />
          </CardContent>
        </Card>

        {/* Capability Areas */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-mono text-base">
              Capability Areas
            </CardTitle>
            <CardDescription>
              Select all capability areas your company operates in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChipSelect
              options={capabilityOptions}
              selected={form.selectedCapabilities}
              onToggle={(item) =>
                toggleArrayItem("selectedCapabilities", item)
              }
            />
          </CardContent>
        </Card>

        {/* Past Performance */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-mono text-base">
                  Past Performance
                </CardTitle>
                <CardDescription>
                  Add relevant contract past performance entries.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={addPastPerformance}
              >
                <Plus className="size-3" />
                Add Entry
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.pastPerformance.length === 0 && (
              <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-border/40 text-xs text-muted-foreground/50">
                No past performance entries yet
              </div>
            )}
            {form.pastPerformance.map((pp, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-border/50 bg-card/30 p-4"
              >
                <button
                  type="button"
                  onClick={() => removePastPerformance(idx)}
                  className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Contract Name
                    </label>
                    <Input
                      placeholder="e.g. Project ARCHANGEL"
                      value={pp.contractName}
                      onChange={(e) =>
                        updatePastPerformance(idx, "contractName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Agency
                    </label>
                    <Input
                      placeholder="e.g. USSOCOM"
                      value={pp.agency}
                      onChange={(e) =>
                        updatePastPerformance(idx, "agency", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Contract Value
                    </label>
                    <Input
                      placeholder="e.g. $3.2M"
                      value={pp.value}
                      onChange={(e) =>
                        updatePastPerformance(idx, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Performance Period
                    </label>
                    <Input
                      placeholder="e.g. 2023-2025"
                      value={pp.period}
                      onChange={(e) =>
                        updatePastPerformance(idx, "period", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ── Step 3: Credentials ───────────────────────────────────── */

  function Step3() {
    return (
      <div className="space-y-6">
        {/* Security Clearances */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Shield className="size-5 text-primary" />
              Security Clearances
            </CardTitle>
            <CardDescription>
              Select the clearance levels your company holds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckboxGroup
              options={clearanceOptions}
              selected={form.clearances}
              onToggle={(item) => toggleArrayItem("clearances", item)}
            />
          </CardContent>
        </Card>

        {/* Set-Aside Eligibility */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-mono text-base">
              Set-Aside Eligibility
            </CardTitle>
            <CardDescription>
              Select all socioeconomic categories your company qualifies for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckboxGroup
              options={setAsideOptions}
              selected={form.setAsides}
              onToggle={(item) => toggleArrayItem("setAsides", item)}
            />
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-mono text-base">Certifications</CardTitle>
            <CardDescription>
              Select the certifications your company holds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckboxGroup
              options={certificationOptions}
              selected={form.certifications}
              onToggle={(item) => toggleArrayItem("certifications", item)}
            />
          </CardContent>
        </Card>

        {/* SAM.gov & CAGE */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-mono text-base">
              Registration Numbers
            </CardTitle>
            <CardDescription>
              Your SAM.gov and CAGE identifiers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  SAM.gov UEI Number
                </label>
                <Input
                  placeholder="e.g. JQNC8LN7X3M3"
                  value={form.ueiNumber}
                  onChange={(e) => updateField("ueiNumber", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  CAGE Code
                </label>
                <Input
                  placeholder="e.g. 7X4K2"
                  value={form.cageCode}
                  onChange={(e) => updateField("cageCode", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ── Step 4: Review ────────────────────────────────────────── */

  function ReviewItem({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) {
    return (
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">
          {value || (
            <span className="text-muted-foreground/40 italic">Not provided</span>
          )}
        </p>
      </div>
    );
  }

  function Step4() {
    return (
      <div className="space-y-6">
        {/* Company Info Summary */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-base">
              <Building2 className="size-4 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ReviewItem label="Company Name" value={form.companyName} />
            <ReviewItem label="Founded" value={form.foundedYear} />
            <ReviewItem label="Employees" value={form.employeeCount} />
            <ReviewItem label="Annual Revenue" value={form.annualRevenue} />
            <ReviewItem label="Location" value={form.primaryLocation} />
            <ReviewItem label="Website" value={form.website} />
            <div className="sm:col-span-2">
              <ReviewItem label="Description" value={form.description} />
            </div>
          </CardContent>
        </Card>

        {/* Capabilities Summary */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-base">
              <Cpu className="size-4 text-primary" />
              Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">NAICS Codes</p>
              <div className="flex flex-wrap gap-1.5">
                {form.selectedNaics.length > 0 ? (
                  form.selectedNaics.map((code) => (
                    <Badge key={code} variant="secondary" className="font-mono text-xs">
                      {code}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground/40 italic">
                    None selected
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Capability Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {form.selectedCapabilities.length > 0 ? (
                  form.selectedCapabilities.map((cap) => (
                    <Badge key={cap} variant="secondary" className="text-xs">
                      {cap}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground/40 italic">
                    None selected
                  </span>
                )}
              </div>
            </div>

            {form.pastPerformance.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Past Performance ({form.pastPerformance.length}{" "}
                    {form.pastPerformance.length === 1 ? "entry" : "entries"})
                  </p>
                  <div className="space-y-2">
                    {form.pastPerformance.map((pp, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm"
                      >
                        <span className="font-medium">
                          {pp.contractName || "Untitled"}
                        </span>
                        {pp.agency && (
                          <span className="text-muted-foreground">
                            {" "}
                            — {pp.agency}
                          </span>
                        )}
                        {pp.value && (
                          <span className="ml-2 font-mono text-xs text-primary">
                            {pp.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Credentials Summary */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-base">
              <Shield className="size-4 text-primary" />
              Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Security Clearances
              </p>
              <div className="flex flex-wrap gap-1.5">
                {form.clearances.length > 0 ? (
                  form.clearances.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground/40 italic">
                    None selected
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Set-Aside Eligibility
              </p>
              <div className="flex flex-wrap gap-1.5">
                {form.setAsides.length > 0 ? (
                  form.setAsides.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground/40 italic">
                    None selected
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Certifications
              </p>
              <div className="flex flex-wrap gap-1.5">
                {form.certifications.length > 0 ? (
                  form.certifications.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground/40 italic">
                    None selected
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ReviewItem label="SAM.gov UEI" value={form.ueiNumber} />
              <ReviewItem label="CAGE Code" value={form.cageCode} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────── */

  const stepComponents = [Step1, Step2, Step3, Step4];
  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="mb-8 text-center">
          <h1 className="font-mono text-2xl font-bold tracking-tight">
            Set Up Your Profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us about your company so we can find contracts you can win.
          </p>
        </div>

        {/* ── Step indicator ────────────────────────────────────── */}
        <div className="mb-10">
          <StepIndicator />
        </div>

        {/* ── Step content ──────────────────────────────────────── */}
        <CurrentStepComponent />

        {/* ── Navigation ───────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-1.5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} className="gap-1.5">
              Next
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                /* Mock launch — skeleton only */
              }}
            >
              <Rocket className="size-4" />
              Launch
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
