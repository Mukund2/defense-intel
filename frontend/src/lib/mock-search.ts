import { mockOpportunities, type Opportunity } from "@/lib/mock-data";

export interface SearchResult {
  opportunities: Opportunity[];
  aiResponse: string;
}

const AI_RESPONSES: Record<string, string> = {
  uas: `Based on your company profile, I found **2 strong UAS opportunities** right now. The USSOCOM Counter-Detection contract (OPP-2026-001) is your best shot — no incumbent, OTA vehicle, and you have direct SOCOM past performance from Project ARCHANGEL. The DARPA UGV prototype (OPP-2026-005) is also worth pursuing given your autonomous systems IP. Both are set-aside eligible. I'd recommend prioritizing the SOCOM opportunity given the April 15 deadline.`,
  cyber: `I see **2 cybersecurity-related opportunities**, but they're very different risk profiles. The DISA EW modernization (OPP-2026-003) is a realistic target — the government wants to move away from Raytheon's legacy solution and your cloud-native stack is a strong fit. However, the DISA Endpoint Security contract (OPP-2026-004) at $12.5M is likely too large — Leidos is entrenched and you'd need FedRAMP High authorization. I'd recommend bidding on the EW tool and skipping the endpoint security.`,
  isr: `Your **strongest opportunity right now** is the Army ISR Data Processing Platform (OPP-2026-002). Here's why: you have directly relevant past performance (DIA Edge Analytics, Project ARCHANGEL), the incumbent Booz Allen has declining CPARS, and it's SDVOSB set-aside which limits competition. At $8.7M it's right-sized for your team. The Space Domain Awareness SBIR (OPP-2026-006) is also worth pursuing as a lower-risk parallel effort.`,
  socom: `You have **strong SOCOM positioning** with 2 active opportunities. The Counter-UAS system (OPP-2026-001) is a 78% win probability — your best across the board. The Secure Mobile Comms platform (OPP-2026-008) is more competitive but the incumbent TrellisWare has a hardware-heavy approach that the government wants to move away from. Your software-defined approach is exactly what they're looking for. Note: the comms RFP due date is March 15 — that's imminent.`,
  default: `I analyzed your company profile against **${mockOpportunities.length} active opportunities**. Your strongest matches are in Counter-UAS (78% win probability), ISR data processing (62%), and Space Domain Awareness (71%). All three leverage your core capabilities and past performance. I'd recommend focusing your capture resources on the top 3 BID-rated opportunities and monitoring the 2 CONSIDER-rated ones for favorable amendments.`,
};

export function mockSearch(query: string): SearchResult {
  const q = query.toLowerCase().trim();

  // Keyword matching against opportunities
  const scored = mockOpportunities.map((opp) => {
    let score = 0;
    const searchFields = [
      opp.title,
      opp.agency,
      opp.type,
      opp.description,
      opp.naics,
      opp.setAside ?? "",
      ...opp.matchReasons,
    ]
      .join(" ")
      .toLowerCase();

    // Split query into words and check each
    const words = q.split(/\s+/).filter(Boolean);
    for (const word of words) {
      if (searchFields.includes(word)) score += 10;
    }

    // Boost by win probability for relevance
    score += opp.winProbability / 20;

    return { opp, score };
  });

  const filtered = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.opp);

  // If no keyword matches, return all sorted by win probability
  const opportunities =
    filtered.length > 0
      ? filtered
      : [...mockOpportunities].sort((a, b) => b.winProbability - a.winProbability);

  // Pick AI response based on query keywords
  let aiResponse = AI_RESPONSES.default;
  if (q.includes("uas") || q.includes("drone") || q.includes("counter")) {
    aiResponse = AI_RESPONSES.uas;
  } else if (q.includes("cyber") || q.includes("ew") || q.includes("electronic warfare")) {
    aiResponse = AI_RESPONSES.cyber;
  } else if (q.includes("isr") || q.includes("intelligence") || q.includes("data") || q.includes("analytics")) {
    aiResponse = AI_RESPONSES.isr;
  } else if (q.includes("socom") || q.includes("sof") || q.includes("special operations")) {
    aiResponse = AI_RESPONSES.socom;
  }

  return { opportunities, aiResponse };
}
