// Mock data for Defense BD Platform
// Realistic defense contracting data for Meridian Defense Systems

// ─── Opportunities ───────────────────────────────────────────────────────────

export interface Opportunity {
  id: string;
  title: string;
  agency: string;
  type: "RFP" | "SBIR" | "OTA" | "Sources Sought";
  postedDate: string;
  dueDate: string;
  value: string;
  naics: string;
  setAside: string | null;
  winProbability: number;
  recommendation: "BID" | "CONSIDER" | "SKIP";
  incumbent: string | null;
  incumbentWeakness: string | null;
  matchReasons: string[];
  status: "matched" | "qualified" | "pursuing" | "submitted" | "won" | "lost";
  competitorCount: number;
  description: string;
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "OPP-2026-001",
    title: "Small UAS Counter-Detection & Defeat System",
    agency: "USSOCOM",
    type: "OTA",
    postedDate: "2026-02-28",
    dueDate: "2026-04-15",
    value: "$4.2M",
    naics: "334511",
    setAside: "Small Business",
    winProbability: 78,
    recommendation: "BID",
    incumbent: null,
    incumbentWeakness: null,
    matchReasons: [
      "Capability match: Counter-UAS & autonomous systems",
      "Set-aside eligible: Small Business",
      "No incumbent — new requirement",
      "OTA vehicle enables rapid prototyping",
      "Prior SOCOM past performance (Project ARCHANGEL)",
    ],
    status: "pursuing",
    competitorCount: 6,
    description:
      "SOCOM seeks a modular, man-portable counter-small UAS system capable of detection, tracking, and kinetic/non-kinetic defeat of Group 1-3 UAS in contested environments. System must integrate with existing C2 architectures and support ATAK.",
  },
  {
    id: "OPP-2026-002",
    title: "Tactical Edge ISR Data Processing Platform",
    agency: "Army PEO IEW&S",
    type: "RFP",
    postedDate: "2026-01-15",
    dueDate: "2026-03-30",
    value: "$8.7M",
    naics: "541512",
    setAside: "SDVOSB",
    winProbability: 62,
    recommendation: "BID",
    incumbent: "Booz Allen Hamilton",
    incumbentWeakness:
      "CPARS rating dropped to Satisfactory on last period. Customer complaints about staff turnover and slow delivery of edge-compute integration.",
    matchReasons: [
      "Capability match: ISR data fusion & edge computing",
      "Set-aside eligible: SDVOSB",
      "Incumbent weakness: declining CPARS",
      "Past performance: similar ISR platform for DIA",
      "NAICS 541512 alignment",
    ],
    status: "pursuing",
    competitorCount: 4,
    description:
      "Full lifecycle development and deployment of a tactical edge processing platform for multi-INT ISR data. Must support disconnected, intermittent, and limited (DIL) bandwidth environments. Requires AI/ML-enabled data triage and automated reporting.",
  },
  {
    id: "OPP-2026-003",
    title: "Next-Gen Electronic Warfare Mission Planning Tool",
    agency: "DISA",
    type: "RFP",
    postedDate: "2026-02-10",
    dueDate: "2026-05-01",
    value: "$3.1M",
    naics: "541330",
    setAside: null,
    winProbability: 41,
    recommendation: "CONSIDER",
    incumbent: "Raytheon (RTX)",
    incumbentWeakness:
      "Solution is legacy-heavy with outdated UI. Government desire to modernize and move to cloud-native architecture.",
    matchReasons: [
      "Capability match: EW systems expertise",
      "Government seeking modernization — favors agile vendors",
      "Cloud-native architecture aligns with tech stack",
    ],
    status: "qualified",
    competitorCount: 9,
    description:
      "Modernize the EW mission planning toolset to a cloud-native, containerized architecture. Must integrate with JEMSO and provide real-time spectrum management visualization. Requires TS/SCI cleared personnel.",
  },
  {
    id: "OPP-2026-004",
    title: "Cybersecurity Continuous Monitoring — DISA Endpoint Security",
    agency: "DISA",
    type: "RFP",
    postedDate: "2026-03-01",
    dueDate: "2026-06-15",
    value: "$12.5M",
    naics: "541519",
    setAside: null,
    winProbability: 18,
    recommendation: "SKIP",
    incumbent: "Leidos",
    incumbentWeakness: null,
    matchReasons: [
      "Partial capability match: cybersecurity ops",
    ],
    status: "matched",
    competitorCount: 14,
    description:
      "Enterprise-scale continuous monitoring and endpoint security across DISA-managed networks. Covers 500K+ endpoints, SIEM integration, and 24/7 SOC operations. Requires existing FedRAMP High authorization.",
  },
  {
    id: "OPP-2026-005",
    title: "Autonomous Logistics Resupply — Unmanned Ground Vehicle Prototype",
    agency: "DARPA",
    type: "OTA",
    postedDate: "2026-03-05",
    dueDate: "2026-04-20",
    value: "$2.4M",
    naics: "336999",
    setAside: null,
    winProbability: 55,
    recommendation: "BID",
    incumbent: null,
    incumbentWeakness: null,
    matchReasons: [
      "Capability match: autonomous vehicle systems",
      "No incumbent — new R&D program",
      "DARPA favors innovative small companies",
      "Existing IP in autonomous navigation",
      "Phase 1 prototype — right-sized for 45-person company",
    ],
    status: "qualified",
    competitorCount: 8,
    description:
      "DARPA seeks prototype autonomous UGV for contested logistics resupply in GPS-denied environments. Vehicle must navigate complex terrain using multi-sensor fusion (LiDAR, visual, thermal) and carry 500 lb payload over 50 km range.",
  },
  {
    id: "OPP-2026-006",
    title: "Space Domain Awareness Data Analytics Platform",
    agency: "USSF / SpOC",
    type: "SBIR",
    postedDate: "2026-02-20",
    dueDate: "2026-04-10",
    value: "$1.8M",
    naics: "518210",
    setAside: "Small Business",
    winProbability: 71,
    recommendation: "BID",
    incumbent: null,
    incumbentWeakness: null,
    matchReasons: [
      "Capability match: data analytics & ML pipelines",
      "Set-aside eligible: Small Business",
      "SBIR Phase II — lower competition",
      "Adjacent experience in ISR data fusion",
      "Space Force actively seeking non-traditional vendors",
    ],
    status: "pursuing",
    competitorCount: 5,
    description:
      "Phase II SBIR for development of an AI/ML-powered analytics platform to process and correlate space domain awareness data from heterogeneous sensor networks. Must provide predictive conjunction analysis and anomaly detection for objects in LEO/MEO/GEO.",
  },
  {
    id: "OPP-2026-007",
    title: "Joint All-Domain C2 — Tactical Network Integration",
    agency: "Army PEO C3T",
    type: "Sources Sought",
    postedDate: "2026-03-08",
    dueDate: "2026-03-28",
    value: "$6.9M",
    naics: "541330",
    setAside: "8(a)",
    winProbability: 12,
    recommendation: "SKIP",
    incumbent: "General Dynamics IT",
    incumbentWeakness:
      "Slow integration timelines. Government frustrated with pace of JADC2 node deployments.",
    matchReasons: [
      "Partial capability match: network integration",
      "Not 8(a) eligible — set-aside disqualification",
    ],
    status: "matched",
    competitorCount: 7,
    description:
      "Sources sought for tactical network integration support to the JADC2 operational architecture. Requires expertise in Link 16, TTNT, STITCHES, and multi-domain gateway solutions. Must support ABMS and Project Convergence exercises.",
  },
  {
    id: "OPP-2026-008",
    title: "Secure Mobile Communications Platform — SOF Variant",
    agency: "USSOCOM",
    type: "RFP",
    postedDate: "2026-01-20",
    dueDate: "2026-03-15",
    value: "$5.3M",
    naics: "334220",
    setAside: "Small Business",
    winProbability: 49,
    recommendation: "CONSIDER",
    incumbent: "TrellisWare Technologies",
    incumbentWeakness:
      "Hardware-focused solution is expensive and difficult to update. Government wants software-defined approach with OTA updates.",
    matchReasons: [
      "Capability match: secure comms & software-defined systems",
      "Set-aside eligible: Small Business",
      "Incumbent weakness: inflexible hardware approach",
      "SOCOM relationship from prior work",
    ],
    status: "submitted",
    competitorCount: 6,
    description:
      "Development of a software-defined secure mobile communications platform for SOF operators. Must support NSA Type 1 encryption, mesh networking, and operate across HF/VHF/UHF/SHF bands. Platform must be NDI/NDP compliant and ruggedized to MIL-STD-810H.",
  },
];

// ─── Company Profile ─────────────────────────────────────────────────────────

export interface CompanyProfile {
  name: string;
  description: string;
  founded: number;
  employees: number;
  revenue: string;
  capabilities: string[];
  naicsCodes: { code: string; description: string }[];
  clearances: string[];
  setAsideEligibility: string[];
  pastPerformance: {
    contract: string;
    agency: string;
    value: string;
    period: string;
    description: string;
  }[];
  locations: string[];
}

export const mockCompanyProfile: CompanyProfile = {
  name: "Meridian Defense Systems",
  description:
    "Meridian Defense Systems is a veteran-owned small business specializing in autonomous systems, ISR data fusion, and electronic warfare solutions for the Department of Defense. Founded by former SOCOM operators and DARPA researchers, Meridian combines deep domain expertise with cutting-edge AI/ML capabilities to deliver mission-critical technology at the tactical edge.",
  founded: 2018,
  employees: 45,
  revenue: "$12M",
  capabilities: [
    "Autonomous Systems & Robotics",
    "ISR Data Fusion & Analytics",
    "Electronic Warfare (EW)",
    "Counter-UAS Systems",
    "Edge Computing & AI/ML",
    "Secure Communications",
    "Cybersecurity Operations",
    "Software-Defined Radio (SDR)",
    "Sensor Integration & Multi-INT Processing",
    "Cloud-Native Application Development",
  ],
  naicsCodes: [
    { code: "541330", description: "Engineering Services" },
    { code: "541512", description: "Computer Systems Design Services" },
    { code: "541519", description: "Other Computer Related Services" },
    { code: "518210", description: "Data Processing, Hosting, and Related Services" },
    { code: "334511", description: "Search, Detection, Navigation, Guidance, Aeronautical, and Nautical System and Instrument Manufacturing" },
    { code: "334220", description: "Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing" },
    { code: "336999", description: "All Other Transportation Equipment Manufacturing" },
    { code: "541715", description: "Research and Development in the Physical, Engineering, and Life Sciences (except Nanotechnology and Biotechnology)" },
  ],
  clearances: ["SECRET", "TOP SECRET", "TS/SCI"],
  setAsideEligibility: ["Small Business", "SDVOSB"],
  pastPerformance: [
    {
      contract: "Project ARCHANGEL — Tactical ISR Platform",
      agency: "USSOCOM",
      value: "$3.2M",
      period: "2023-2025",
      description:
        "Designed and deployed a tactical ISR data fusion platform for SOF units. Integrated multi-sensor feeds (EO/IR, SIGINT, HUMINT) into a single common operating picture with AI-driven threat detection. Achieved Exceptional CPARS rating.",
    },
    {
      contract: "DIA Edge Analytics Pilot",
      agency: "Defense Intelligence Agency",
      value: "$1.8M",
      period: "2024-2025",
      description:
        "Developed and deployed an edge computing analytics solution for processing classified intelligence data in forward-deployed environments. Reduced analyst processing time by 60%. Very Good CPARS.",
    },
    {
      contract: "Counter-UAS Detection Algorithm R&D",
      agency: "Army DEVCOM C5ISR Center",
      value: "$2.1M",
      period: "2022-2024",
      description:
        "Research and development of novel ML-based algorithms for detecting and classifying small UAS using RF signature analysis and multi-sensor fusion. Algorithms integrated into PRC-171 platform. Exceptional CPARS.",
    },
    {
      contract: "Cyber Range Modernization",
      agency: "US Cyber Command",
      value: "$1.4M",
      period: "2024-2026",
      description:
        "Modernizing cyber range infrastructure to support joint force training exercises. Includes red/blue team automation, realistic threat emulation, and cloud-hybrid architecture. In progress — on schedule and on budget.",
    },
    {
      contract: "EW Spectrum Mapping Tool (Phase I SBIR)",
      agency: "DARPA",
      value: "$0.8M",
      period: "2023-2024",
      description:
        "Phase I SBIR developing a real-time electromagnetic spectrum mapping and visualization tool for contested environments. Successfully transitioned to Phase II. Satisfactory CPARS.",
    },
  ],
  locations: [
    "Arlington, VA (HQ)",
    "Colorado Springs, CO",
    "Tampa, FL (SOCOM support)",
    "Huntsville, AL",
  ],
};

// ─── Competitor Vendors ──────────────────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  wins: number;
  totalValue: string;
  domains: string[];
  avgWinRate: string;
  recentAwards: number;
}

export const mockVendors: Vendor[] = [
  {
    id: "VEND-001",
    name: "Paladin Technologies",
    wins: 23,
    totalValue: "$87M",
    domains: ["Counter-UAS", "Autonomous Systems", "ISR"],
    avgWinRate: "34%",
    recentAwards: 4,
  },
  {
    id: "VEND-002",
    name: "Citadel Defense Group",
    wins: 18,
    totalValue: "$62M",
    domains: ["Electronic Warfare", "Cyber", "C4ISR"],
    avgWinRate: "28%",
    recentAwards: 3,
  },
  {
    id: "VEND-003",
    name: "Vanguard Systems Inc.",
    wins: 31,
    totalValue: "$124M",
    domains: ["Secure Communications", "Network Integration", "SDR"],
    avgWinRate: "41%",
    recentAwards: 6,
  },
  {
    id: "VEND-004",
    name: "Blackridge Analytics",
    wins: 14,
    totalValue: "$38M",
    domains: ["Data Analytics", "AI/ML", "Space Domain Awareness"],
    avgWinRate: "22%",
    recentAwards: 2,
  },
  {
    id: "VEND-005",
    name: "Summit Tactical Solutions",
    wins: 27,
    totalValue: "$95M",
    domains: ["SOF Support", "Tactical Systems", "Logistics Automation"],
    avgWinRate: "36%",
    recentAwards: 5,
  },
];

// ─── Pipeline Statistics ─────────────────────────────────────────────────────

export interface PipelineStats {
  matched: number;
  qualified: number;
  pursuing: number;
  submitted: number;
  won: number;
  lost: number;
  totalValue: string;
}

export const mockPipelineStats: PipelineStats = {
  matched: 24,
  qualified: 12,
  pursuing: 6,
  submitted: 3,
  won: 2,
  lost: 1,
  totalValue: "$47.8M",
};

// ─── Capture Strategy ────────────────────────────────────────────────────────

export interface CaptureStrategy {
  opportunityId: string;
  winThemes: string[];
  differentiators: string[];
  ghostingPoints: string[];
  pricingRange: { low: string; target: string; high: string };
  evaluationFactors: { factor: string; weight: string; strategy: string }[];
  keyActions: { action: string; deadline: string; priority: "critical" | "high" | "medium" | "low" }[];
}

export const mockCaptureStrategy: CaptureStrategy = {
  opportunityId: "OPP-2026-002",
  winThemes: [
    "Battle-tested edge computing — proven 60% reduction in analyst processing time on DIA contract",
    "Veteran-led team with direct ISR operational experience — we've been the end user",
    "Agile delivery model with 2-week sprint cycles vs. incumbent's waterfall approach",
    "Zero staff turnover on active contracts — continuity the incumbent can't promise",
    "Purpose-built for DIL environments — not a commercial product force-fitted to tactical edge",
  ],
  differentiators: [
    "Proprietary edge AI inference engine optimized for ARM/GPU-constrained hardware",
    "SBIR-derived spectrum mapping IP directly applicable to multi-INT fusion",
    "Only SDVOSB competitor with Exceptional CPARS on comparable ISR platform work",
    "Existing SOCOM and DIA relationships with referenceable program managers",
    "Full-stack team: RF engineers + ML scientists + cleared software developers under one roof",
  ],
  ghostingPoints: [
    "Incumbent's CPARS dropped to Satisfactory — raise evaluation of past performance as discriminator",
    "Incumbent experienced 40% staff turnover last year — emphasize our retention and team stability",
    "Incumbent's solution requires CONUS reach-back for processing — our edge-native architecture operates fully disconnected",
    "Incumbent uses legacy monolithic architecture — position our cloud-native microservices as lower lifecycle cost",
    "Incumbent has no SDVOSB status — highlight socioeconomic alignment and 'best value to the warfighter' narrative",
  ],
  pricingRange: {
    low: "$7.2M",
    target: "$8.1M",
    high: "$9.0M",
  },
  evaluationFactors: [
    {
      factor: "Technical Approach",
      weight: "40%",
      strategy:
        "Lead with edge-native architecture. Emphasize DIL-optimized processing, AI/ML triage automation, and proven performance on DIA pilot. Include architecture diagrams showing disconnected ops capability.",
    },
    {
      factor: "Past Performance",
      weight: "25%",
      strategy:
        "Feature Project ARCHANGEL (Exceptional CPARS, direct ISR relevance) and DIA Edge Analytics (Very Good, identical mission set). Request PM references proactively. Contrast with incumbent's declining ratings.",
    },
    {
      factor: "Management Approach",
      weight: "20%",
      strategy:
        "Highlight agile methodology with 2-week sprints, embedded government PO participation, and DevSecOps CI/CD pipeline. Show org chart with named key personnel and their relevant clearances.",
    },
    {
      factor: "Price",
      weight: "15%",
      strategy:
        "Price at target ($8.1M) — competitive but not lowest. Best Value evaluation allows trading price for technical superiority. Itemize cost savings from edge processing (reduced SATCOM bandwidth costs).",
    },
  ],
  keyActions: [
    {
      action: "Submit questions to Contracting Officer by Q&A deadline",
      deadline: "2026-03-15",
      priority: "critical",
    },
    {
      action: "Schedule capability briefing with PEO IEW&S technical evaluators",
      deadline: "2026-03-18",
      priority: "critical",
    },
    {
      action: "Finalize teaming agreement with Argon ST for RF sensor integration",
      deadline: "2026-03-20",
      priority: "high",
    },
    {
      action: "Complete pricing model and ICE (Independent Cost Estimate) review",
      deadline: "2026-03-22",
      priority: "high",
    },
    {
      action: "Draft and review Technical Volume — internal pink team",
      deadline: "2026-03-25",
      priority: "critical",
    },
    {
      action: "Conduct red team review of full proposal",
      deadline: "2026-03-28",
      priority: "critical",
    },
    {
      action: "Obtain past performance questionnaires from SOCOM and DIA PMs",
      deadline: "2026-03-14",
      priority: "high",
    },
    {
      action: "Prepare and rehearse oral presentation (if required)",
      deadline: "2026-03-27",
      priority: "medium",
    },
  ],
};

// ─── Agency Profile ──────────────────────────────────────────────────────────

export interface AgencyProfile {
  name: string;
  smallBusinessRate: string;
  avgAwardTime: string;
  evaluationStyle: "Best Value" | "LPTA";
  recentAwards: number;
  topVendors: string[];
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  opportunityIds: string[];
  createdAt: string;
}

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "UAS Contracts",
    description: "Counter-UAS and autonomous systems opportunities",
    color: "bg-violet-500",
    opportunityIds: ["OPP-2026-001", "OPP-2026-005"],
    createdAt: "2026-02-15",
  },
  {
    id: "proj-2",
    name: "Cyber Ops",
    description: "Cybersecurity and electronic warfare opportunities",
    color: "bg-blue-500",
    opportunityIds: ["OPP-2026-003", "OPP-2026-004"],
    createdAt: "2026-02-20",
  },
  {
    id: "proj-3",
    name: "ISR & Analytics",
    description: "ISR data processing and space domain awareness",
    color: "bg-emerald-500",
    opportunityIds: ["OPP-2026-002", "OPP-2026-006"],
    createdAt: "2026-03-01",
  },
];

// ─── Agency Profile ──────────────────────────────────────────────────────────

export const mockAgencyProfile: AgencyProfile = {
  name: "U.S. Special Operations Command (USSOCOM)",
  smallBusinessRate: "32.4%",
  avgAwardTime: "127 days",
  evaluationStyle: "Best Value",
  recentAwards: 284,
  topVendors: [
    "L3Harris Technologies",
    "SAIC",
    "Booz Allen Hamilton",
    "Northrop Grumman",
    "Leidos",
    "Sierra Nevada Corporation",
    "Palantir Technologies",
    "Anduril Industries",
  ],
};
