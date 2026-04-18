// State contractor license bond data.
// Every entry must cite an official source (statute, agency page, or bond form).
// Update `lastVerified` when you re-check the state's published requirement.

export type BondStructure = "flat" | "tiered" | "variable" | "alternative" | "none";

export interface BondAmountEntry {
  label: string;   // e.g. "All contractors" | "General" | "Residential Level 1"
  amount: number;  // in USD
  note?: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface StateBond {
  slug: string;              // URL slug, e.g. "california"
  name: string;              // Display name
  abbreviation: string;      // "CA"
  agency: string;            // Full licensing authority name
  agencyShort: string;       // Short form for inline prose
  agencyUrl: string;
  statute: string;           // e.g. "Business & Professions Code §7071.6"
  statuteUrl?: string;
  structure: BondStructure;
  bondAmounts: BondAmountEntry[];    // Empty for "none"
  obligee: string;
  renewalTerm: string;       // e.g. "1 year" | "2 years"
  filingProcess: string;     // Short narrative — how the bond is filed
  keyFacts: string[];        // 3–5 bullet-sized facts shown in the "The Short Version" box
  notes?: string;            // State-specific gotchas / nuance (HTML allowed)
  variableContext?: string;  // For "variable" structure — explains how the amount is set
  alternativeContext?: string; // For "alternative" structure — what the bond is alternative to
  noneContext?: string;      // For "none" — why no state bond is required
  sampleAmounts?: number[];  // For "variable" — sample bond amounts to show cost tables for
  lastVerified: string;      // ISO date
  sources: Source[];
}

export const stateBonds: StateBond[] = [
  // ─── CALIFORNIA ─────────────────────────────────────────────────────────
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    agency: "Contractors State License Board",
    agencyShort: "CSLB",
    agencyUrl: "https://www.cslb.ca.gov",
    statute: "Business & Professions Code §7071.6",
    statuteUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7071.6",
    structure: "flat",
    bondAmounts: [
      {
        label: "All licensed contractors",
        amount: 25000,
        note: "A, B, and C classifications",
      },
    ],
    obligee: "State of California — Contractors State License Board",
    renewalTerm: "Continuous until cancelled",
    filingProcess:
      "The bond is filed directly with the CSLB. It must be on the CSLB's approved bond form and issued by a surety admitted in California. The bond stays in force until the surety or the contractor cancels it.",
    keyFacts: [
      "$25,000 bond required for every licensed contractor in California",
      "Amount was raised from $15,000 to $25,000 on January 1, 2023 (SB 607)",
      "Required for A (General Engineering), B (General Building), and all C (Specialty) licenses",
      "A separate $12,500 Bond of Qualifying Individual may also be required if the qualifier is not the sole owner",
    ],
    notes: `<p>A few things California contractors routinely get wrong:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>The Bond of Qualifying Individual is separate.</strong> If your license qualifier isn't the sole owner of the business, you also need a $12,500 BQI bond. That's a second premium on top of the $25,000 contractor bond.</li>
        <li><strong>The bond must be on the CSLB's exact form.</strong> A generic "contractor license bond" from an out-of-state surety will get rejected. The surety must be admitted in California and use the CSLB form.</li>
        <li><strong>A disciplinary bond is a different animal.</strong> If your license has been revoked and reinstated, CSLB may require a $100,000 disciplinary bond instead of (or on top of) the standard $25,000 bond.</li>
      </ul>`,
    lastVerified: "2026-04-07",
    sources: [
      {
        label: "CSLB — Bond Requirements",
        url: "https://www.cslb.ca.gov/contractors/maintain_license/bond_information/bond_requirements.aspx",
      },
      {
        label: "CSLB — Bond Basics",
        url: "https://www.cslb.ca.gov/contractors/bond_basics.aspx",
      },
      {
        label: "Cal. Business & Professions Code §7071.6",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7071.6",
      },
    ],
  },

  // ─── WASHINGTON ─────────────────────────────────────────────────────────
  {
    slug: "washington",
    name: "Washington",
    abbreviation: "WA",
    agency: "Department of Labor & Industries",
    agencyShort: "L&I",
    agencyUrl: "https://www.lni.wa.gov",
    statute: "RCW 18.27.040",
    statuteUrl: "https://app.leg.wa.gov/RCW/default.aspx?cite=18.27.040",
    structure: "tiered",
    bondAmounts: [
      {
        label: "General Contractor",
        amount: 30000,
        note: "Raised from $12,000 on July 1, 2024",
      },
      {
        label: "Specialty Contractor",
        amount: 15000,
        note: "Raised from $6,000 on July 1, 2024",
      },
    ],
    obligee: "State of Washington — Department of Labor & Industries",
    renewalTerm: "Continuous until cancelled",
    filingProcess:
      "Washington calls it 'contractor registration' rather than licensing. The bond is filed with L&I as part of the registration packet, along with proof of general liability insurance. You cannot legally advertise or bid on work until your registration is active.",
    keyFacts: [
      "$30,000 bond for General Contractors, $15,000 for Specialty",
      "First bond increase since 2001 — took effect July 1, 2024",
      "Washington uses 'contractor registration' instead of licensing",
      "General liability insurance is also required: $200,000 / $50,000 / $250,000 minimums",
    ],
    notes: `<p>Washington is a state where the distinction between general and specialty actually matters for your wallet:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>General vs. specialty is the whole ball game.</strong> A general contractor pays double the specialty rate ($30K vs $15K bond). If you only do one trade, register as a specialty contractor and save the premium difference.</li>
        <li><strong>The 2024 increase was significant.</strong> If you were bonded before July 2024, your renewal will be roughly 2.5× your old premium. Plan for it.</li>
        <li><strong>L&I also requires insurance.</strong> Don't conflate the bond with insurance — you need both. The bond is for consumer protection claims; the insurance is for liability.</li>
      </ul>`,
    lastVerified: "2026-04-07",
    sources: [
      {
        label: "L&I — Higher contractor bonds announcement",
        url: "https://www.lni.wa.gov/news-events/article/24-13/",
      },
      {
        label: "RCW 18.27 — Registration of Contractors",
        url: "https://app.leg.wa.gov/RCW/default.aspx?cite=18.27",
      },
    ],
  },

  // ─── OREGON ─────────────────────────────────────────────────────────────
  {
    slug: "oregon",
    name: "Oregon",
    abbreviation: "OR",
    agency: "Construction Contractors Board",
    agencyShort: "CCB",
    agencyUrl: "https://www.oregon.gov/ccb",
    statute: "ORS 701.081 (residential) & 701.084 (commercial)",
    statuteUrl: "https://oregon.public.law/statutes/ors_701.068",
    structure: "tiered",
    bondAmounts: [
      { label: "Residential General Contractor", amount: 25000 },
      { label: "Residential Specialty Contractor", amount: 20000 },
      { label: "Residential Limited Contractor", amount: 15000 },
      { label: "Residential Developer", amount: 25000 },
      {
        label: "Commercial General Contractor Level 1",
        amount: 80000,
        note: "For projects exceeding Level 2 dollar thresholds",
      },
      { label: "Commercial Specialty Contractor Level 1", amount: 55000 },
      { label: "Commercial General Contractor Level 2", amount: 25000 },
      { label: "Commercial Specialty Contractor Level 2", amount: 25000 },
      { label: "Commercial Developer", amount: 25000 },
    ],
    obligee: "State of Oregon — Construction Contractors Board",
    renewalTerm: "2 years (matches license term)",
    filingProcess:
      "Oregon is unusual — your bond is tied to a specific license endorsement, and changing endorsements (from residential to commercial, or from Level 2 to Level 1) requires filing a new bond at the higher amount. The CCB processes the bond as part of your license application packet.",
    keyFacts: [
      "Bond amount is determined by endorsement type — 9 different categories",
      "Residential bonds range from $15,000 to $25,000",
      "Commercial bonds range from $25,000 to $80,000",
      "Bond term is 2 years to match the license renewal cycle",
      "The CCB can require up to 5× the standard amount in some disciplinary cases",
    ],
    notes: `<p>Oregon has more bond categories than almost any other state. The real question isn't whether you need a bond — it's which endorsement you're filing under.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Level 1 vs Level 2 matters.</strong> Commercial contractors can save significantly by registering at Level 2 if their project volume stays under the Level 1 thresholds. A Level 1 Commercial General pays over 3× the bond of a Level 2.</li>
        <li><strong>The 2-year term is unusual.</strong> Most states run 1-year bonds. Oregon matches the bond to the 2-year license cycle, so you're paying 2 years of premium upfront.</li>
        <li><strong>Changing endorsements = new bond.</strong> If you grow from residential into commercial work, you can't just upgrade your bond — you file a new one at the higher amount.</li>
      </ul>`,
    lastVerified: "2026-04-07",
    sources: [
      {
        label: "ORS 701.081 — Residential Contractor Bonds",
        url: "https://oregon.public.law/statutes/ors_701.081",
      },
      {
        label: "ORS 701.084 — Commercial Contractor Bonds",
        url: "https://oregon.public.law/statutes/ors_701.084",
      },
      {
        label: "ORS 701.068 — Bonding Requirements",
        url: "https://oregon.public.law/statutes/ors_701.068",
      },
      {
        label: "Oregon CCB — Licensing",
        url: "https://www.oregon.gov/ccb/pages/licensing.aspx",
      },
    ],
  },

  // ─── NEVADA ─────────────────────────────────────────────────────────────
  {
    slug: "nevada",
    name: "Nevada",
    abbreviation: "NV",
    agency: "Nevada State Contractors Board",
    agencyShort: "NSCB",
    agencyUrl: "https://www.nvcontractorsboard.com",
    statute: "NRS Chapter 624",
    statuteUrl: "https://www.leg.state.nv.us/nrs/nrs-624.html",
    structure: "variable",
    bondAmounts: [],
    obligee: "Nevada State Contractors Board",
    renewalTerm: "Continuous — reviewed at each license renewal",
    filingProcess:
      "You don't choose your bond amount in Nevada. You apply for your license, and the NSCB tells you what bond you need after reviewing your application. The number depends on your license classification, the monetary limit you're requesting, your financial responsibility, your experience, and what the board calls 'character.'",
    keyFacts: [
      "No fixed bond amount — the NSCB sets it case-by-case",
      "Range: $1,000 to $500,000 for standard licenses",
      "Pool & spa contractors: $10,000 to $400,000",
      "Residential improvement (post-AB 39): $100,000 minimum consumer protection bond",
      "The board determines your amount after reviewing your application",
    ],
    variableContext: `<p>Nevada is the only state in our first batch that doesn't publish a bond amount schedule. Here's how it actually works in practice:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Your monetary limit drives the number.</strong> Nevada licenses come with a "monetary limit" — the maximum single-project value you can contract for. Higher limits mean higher bonds. A $50,000 monetary limit might come with a $5,000 bond; a $1,000,000+ limit might come with a $50,000+ bond.</li>
        <li><strong>Your financial statements drive it too.</strong> The NSCB looks at working capital, experience, and credit. A thin financial picture can push your required bond higher even at the same monetary limit.</li>
        <li><strong>You won't know until approval.</strong> The board issues a notice after reviewing your application telling you the required bond amount. You then have a set period to post it.</li>
      </ul>
      <p class="mt-4">Below, we've shown estimated premium ranges at four common bond amounts. Your actual amount could land anywhere in Nevada's $1,000–$500,000 range.</p>`,
    sampleAmounts: [10000, 25000, 50000, 100000],
    lastVerified: "2026-04-07",
    sources: [
      {
        label: "NSCB — Bonds",
        url: "https://www.nvcontractorsboard.com/licensing/bonds/",
      },
      {
        label: "NSCB — License Requirements",
        url: "https://www.nvcontractorsboard.com/licensing/license-requirements/",
      },
      {
        label: "NRS Chapter 624 — Contractors",
        url: "https://www.leg.state.nv.us/nrs/nrs-624.html",
      },
    ],
  },

  // ─── VIRGINIA ───────────────────────────────────────────────────────────
  {
    slug: "virginia",
    name: "Virginia",
    abbreviation: "VA",
    agency: "Department of Professional and Occupational Regulation",
    agencyShort: "DPOR",
    agencyUrl: "https://www.dpor.virginia.gov",
    statute: "18 VAC 50-22 (Board for Contractors regulations)",
    statuteUrl: "https://www.dpor.virginia.gov/Boards/Contractors",
    structure: "alternative",
    bondAmounts: [
      {
        label: "Class A Contractor (alternative to $45,000 net worth)",
        amount: 50000,
      },
      {
        label: "Class B Contractor (alternative to $15,000 net worth)",
        amount: 50000,
      },
    ],
    obligee: "Commonwealth of Virginia — Board for Contractors",
    renewalTerm: "2 years (matches the license term)",
    filingProcess:
      "The surety bond is filed with DPOR on the Board for Contractors' A501-27BOND form. The bond must match the 2-year license term and expire on the last day of the month the license expires.",
    keyFacts: [
      "Virginia's $50,000 bond is an ALTERNATIVE to proving net worth, not a hard requirement",
      "Class A contractors: prove $45,000 net worth OR post the bond",
      "Class B contractors: prove $15,000 net worth OR post the bond",
      "Class C contractors: no bond and no net worth requirement",
      "Bond term is 2 years and must end on the last day of the license expiration month",
    ],
    alternativeContext: `<p>Virginia is the only state in our first five where you might not need a bond at all. Here's the full picture:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Class A (projects over $120,000 or contracts over $750,000 annually):</strong> You need to prove either $45,000 in net worth <em>or</em> post a $50,000 surety bond. Most contractors with stable books just provide a financial statement.</li>
        <li><strong>Class B (projects $10,000–$120,000):</strong> You need $15,000 in net worth <em>or</em> the $50,000 bond. The bond makes sense for newer contractors who haven't built up cash reserves.</li>
        <li><strong>Class C (projects under $10,000):</strong> No bond. No net worth. You just pay the licensing fee and pass the exam.</li>
      </ul>
      <p class="mt-4">The bond almost always costs less per year than what you'd pay in opportunity cost to keep $45,000 sitting in a business savings account. For Class A contractors without the net worth, a $50,000 bond at 2% credit is only $1,000/year — cheaper than tying up $45,000 in working capital.</p>`,
    lastVerified: "2026-04-07",
    sources: [
      {
        label: "DPOR — Board for Contractors",
        url: "https://www.dpor.virginia.gov/Boards/Contractors",
      },
      {
        label: "DPOR — Contractor Application Instructions (PDF)",
        url: "https://www.dpor.virginia.gov/sites/default/files/boards/Contractors/Contractor%20Application%20Instructions.pdf",
      },
      {
        label: "DPOR — Surety Bond Form A501-27BOND (PDF)",
        url: "https://www.dpor.virginia.gov/sites/default/files/boards/Contractors/A501-27BOND_pdf.pdf",
      },
    ],
  },

  // ─── TEXAS ──────────────────────────────────────────────────────────────
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    agency: "Texas Department of Licensing and Regulation",
    agencyShort: "TDLR",
    agencyUrl: "https://www.tdlr.texas.gov",
    statute: "No statewide general contractor licensing statute",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A — no statewide bond",
    renewalTerm: "N/A",
    filingProcess:
      "Texas has no statewide general contractor license and no statewide contractor license bond. TDLR licenses specific trades (electricians, HVAC/refrigeration, plumbers via the Texas State Board of Plumbing Examiners) and requires liability insurance rather than a surety bond. Bond requirements in Texas come from city-level contractor registration — Houston, Dallas, San Antonio, and Austin each have their own rules.",
    keyFacts: [
      "No statewide general contractor license in Texas",
      "No statewide contractor license bond",
      "Licensed trades (electrical, HVAC, plumbing) require insurance, not a bond",
      "City-level bonds exist in Houston, Dallas, San Antonio, Austin, and others",
      "TDLR electrical license requires $300K/$600K/$300K liability insurance minimums",
    ],
    noneContext: `<p>Texas is the biggest state in the country without statewide general contractor licensing. There's no state exam, no state registration, and no state bond for general contractors.</p>
      <p>What the state <em>does</em> require:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Trade licenses</strong> — Electricians (TDLR), HVAC and refrigeration (TDLR), and plumbers (Texas State Board of Plumbing Examiners) must be licensed at the state level. Each requires liability insurance, not a bond.</li>
        <li><strong>Insurance minimums</strong> — TDLR electrical contractors need $300,000 per occurrence / $600,000 aggregate / $300,000 completed operations liability coverage. HVAC and plumbing have their own minimums.</li>
        <li><strong>City registration</strong> — Most Texas cities over 50,000 people require contractor registration. Houston, Dallas, Fort Worth, San Antonio, Austin, El Paso, and Arlington all have their own licensing rules, and some require bonds.</li>
      </ul>
      <p class="mt-4">If a bond broker tells you that you need a "Texas contractor bond" without asking which city you work in, they're either confused or selling you something you don't need.</p>
      <p>Texas is part of a pattern — several of the largest states in the country leave contractor regulation entirely to cities. <a href="/states/contractor-license-bond/indiana" class="text-accent hover:underline">Indiana follows the same model</a>, as do Florida, Ohio, and Pennsylvania for general contractors. If you work across these states, you need to research each city separately.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      {
        label: "TDLR — License Search",
        url: "https://www.tdlr.texas.gov/LicenseSearch/",
      },
      {
        label: "Tex. Occ. Code Ch. 1305 (Electricians)",
        url: "https://statutes.capitol.texas.gov/Docs/OC/htm/OC.1305.htm",
      },
      {
        label: "Texas State Board of Plumbing Examiners",
        url: "https://tsbpe.texas.gov",
      },
    ],
  },

  // ─── FLORIDA ────────────────────────────────────────────────────────────
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    agency: "Construction Industry Licensing Board",
    agencyShort: "CILB",
    agencyUrl: "https://www2.myfloridalicense.com/construction-industry/",
    statute: "Fla. Admin. Code R. 61G4-15.006",
    statuteUrl:
      "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-r-61G4-15-006",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A — bond no longer required",
    renewalTerm: "N/A",
    filingProcess:
      "Florida does not require a contractor license bond. Until April 13, 2022, contractors with FICO credit scores below 660 had to post a bond to meet the financial stability requirement. Rule 61G4-15.006 was amended that date to eliminate the bond option entirely. Contractors now satisfy the financial stability rule either by providing a credit score of 660+ or by completing a 14-hour Board-approved financial responsibility course.",
    keyFacts: [
      "Florida does NOT require a contractor license bond",
      "The 'Florida 660 Bond' was eliminated on April 13, 2022",
      "Financial stability is satisfied by FICO 660+ OR a 14-hour course",
      "Credit report must show no unsatisfied judgments or liens",
      "General liability insurance is still required under separate rules",
    ],
    noneContext: `<p>Florida contractors don't need a bond. Full stop.</p>
      <p>This is worth saying clearly because a surprising number of bond broker websites still list a "Florida 660 bond" or "Florida sub-660 contractor bond" as if it's a current requirement. It isn't. The Florida Construction Industry Licensing Board eliminated the bond option entirely when Rule 61G4-15.006 was amended on April 13, 2022.</p>
      <p>Here's what actually satisfies the state's financial stability rule today:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Option 1 — Credit score route:</strong> Provide a current consumer credit report showing a FICO score of 660 or higher with no unsatisfied judgments or liens. No bond, no course, nothing else.</li>
        <li><strong>Option 2 — Course route:</strong> If your credit score is below 660, complete a 14-hour Board-approved financial responsibility course. That's it. The course replaced the bond.</li>
      </ul>
      <p class="mt-4">You still need to pass the trade exam, carry general liability insurance, and meet experience requirements. But you don't need a bond.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      {
        label: "Fla. Admin. Code R. 61G4-15.006 (current text)",
        url: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-r-61G4-15-006",
      },
      {
        label: "Florida DBPR — Construction Industry Licensing Board",
        url: "https://www2.myfloridalicense.com/construction-industry/",
      },
      {
        label: "Fla. Stat. § 489.115",
        url: "http://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0489/Sections/0489.115.html",
      },
    ],
  },

  // ─── NEW YORK ───────────────────────────────────────────────────────────
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    agency: "NYC Department of Consumer and Worker Protection (NYC only)",
    agencyShort: "DCWP",
    agencyUrl: "https://www.nyc.gov/site/dca/index.page",
    statute: "NYC Admin. Code § 20-387 (Home Improvement Business) — NYC only",
    statuteUrl:
      "https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A statewide — NYC DCWP if using NYC bond",
    renewalTerm: "N/A statewide — 2 years for NYC HIC",
    filingProcess:
      "New York has no statewide contractor licensing and no statewide contractor license bond. All contractor regulation happens at the city or county level. New York City's Home Improvement Contractor license is the largest local requirement — contractors either enroll in the DCWP Trust Fund ($200) or post a $20,000 surety bond naming DCWP as certificate holder. Nassau, Suffolk, Westchester, Rockland, and Putnam counties operate their own HIC licensing schemes with varying bond requirements.",
    keyFacts: [
      "No statewide general contractor license in New York",
      "No statewide contractor license bond",
      "NYC Home Improvement Contractor: $20,000 bond OR $200 Trust Fund enrollment",
      "Nassau, Suffolk, Westchester, Rockland, Putnam counties have separate HIC licensing",
      "NYC HIC license runs for 2 years",
    ],
    noneContext: `<p>New York is a patchwork. There is no state-level contractor license, no state exam, and no state bond. Every requirement happens at the city or county level — and they don't coordinate with each other.</p>
      <p>The biggest local requirement by far is New York City's Home Improvement Contractor license, administered by the Department of Consumer and Worker Protection (DCWP):</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>NYC HIC license</strong> — Required to perform any residential home improvement work in the five boroughs. You must either enroll in the DCWP Trust Fund (a $200 one-time fee that pools contractor contributions to pay consumer claims) OR post a $20,000 surety bond naming DCWP as certificate holder. The license runs for 2 years.</li>
        <li><strong>Nassau County</strong> — Separate Home Improvement License through the Office of Consumer Affairs. Bond required.</li>
        <li><strong>Suffolk County</strong> — Separate HIC license through Consumer Affairs. Bond required.</li>
        <li><strong>Westchester, Rockland, Putnam counties</strong> — Independent consumer protection licensing regimes.</li>
      </ul>
      <p class="mt-4">If you work in multiple NY jurisdictions, you need to register in each one. A single statewide license does not exist.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      {
        label: "NYC DCWP — Home Improvement Contractor License Checklist",
        url: "https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page",
      },
      {
        label: "NYC DCWP — HIC Application (PDF)",
        url: "https://www.nyc.gov/assets/dca/downloads/pdf/businesses/LicensingChecklist-HomeImprovementContractor-English.pdf",
      },
      {
        label: "NY Department of State — Licensing Services (no statewide GC license)",
        url: "https://dos.ny.gov/licensing",
      },
    ],
  },

  // ─── PENNSYLVANIA ───────────────────────────────────────────────────────
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbreviation: "PA",
    agency: "Pennsylvania Office of Attorney General",
    agencyShort: "PA OAG",
    agencyUrl:
      "https://www.attorneygeneral.gov/resources/home-improvement-contractor-registration/",
    statute:
      "Home Improvement Consumer Protection Act — 73 P.S. § 517.1 et seq.",
    statuteUrl:
      "https://www.attorneygeneral.gov/resources/home-improvement-contractor-registration/",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A — insurance required, not a bond",
    renewalTerm: "N/A (registration is 2 years)",
    filingProcess:
      "Pennsylvania requires home improvement contractors performing more than $5,000/year in residential work to register with the Office of Attorney General under the Home Improvement Consumer Protection Act (HICPA). Registration requires proof of liability insurance — at least $50,000 personal injury and $50,000 property damage — and a $100 registration fee. No surety bond is required. Registration runs 2 years.",
    keyFacts: [
      "HICPA registration required for home improvement contractors — NOT a license",
      "No statewide contractor license bond",
      "Insurance required: $50,000 personal injury + $50,000 property damage minimum",
      "Registration fee: $100 (effective March 2, 2026)",
      "Registration runs 2 years",
      "Philadelphia and Pittsburgh have separate local licensing",
    ],
    noneContext: `<p>Pennsylvania is one of the most commonly misrepresented states on bond broker websites. Many still list "Pennsylvania contractor license bond" requirements that do not exist.</p>
      <p>Here is what the Commonwealth actually requires:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>HICPA registration</strong> — Contractors performing more than $5,000/year in residential home improvement must register with the PA Office of Attorney General under the Home Improvement Consumer Protection Act. This is registration, not licensing. There is no exam, no experience requirement, and no bond.</li>
        <li><strong>Insurance</strong> — Minimum $50,000 personal injury liability and $50,000 property damage liability. You show proof when you register.</li>
        <li><strong>Registration fee</strong> — $100 as of March 2, 2026.</li>
        <li><strong>2-year term</strong> — Registration renews every 2 years.</li>
      </ul>
      <p class="mt-4">Philadelphia's Department of Licenses and Inspections runs its own contractor licensing for work in the city. Pittsburgh has its own rules as well. Those are local requirements — the state does not impose them and they are not a statewide bond.</p>
      <p>If a broker is quoting you a "Pennsylvania contractor bond," ask them to cite the statute. There isn't one.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      {
        label: "PA OAG — Home Improvement Contractor Registration",
        url: "https://www.attorneygeneral.gov/resources/home-improvement-contractor-registration/",
      },
      {
        label: "PA OAG — HICPA Application Instructions (PDF)",
        url: "https://www.attorneygeneral.gov/wp-content/uploads/2025/08/HICPA-instructions.pdf",
      },
      {
        label: "PA OAG — HICPA FAQ",
        url: "https://www.attorneygeneral.gov/resources/home-improvement-contractor-registration/contractor-frequently-asked-questions/",
      },
    ],
  },

  // ─── OHIO ───────────────────────────────────────────────────────────────
  {
    slug: "ohio",
    name: "Ohio",
    abbreviation: "OH",
    agency: "Ohio Construction Industry Licensing Board",
    agencyShort: "OCILB",
    agencyUrl:
      "https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards/ohio-construction-industry-licensing-board",
    statute: "Ohio Revised Code Chapter 4740",
    statuteUrl: "https://codes.ohio.gov/ohio-revised-code/chapter-4740",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A — insurance required, not a bond",
    renewalTerm: "N/A",
    filingProcess:
      "Ohio licenses five commercial specialty trades statewide through the Ohio Construction Industry Licensing Board under ORC Chapter 4740 — electrical, plumbing, HVAC, hydronics, and refrigeration. OCILB requires contractors in these trades to carry at least $500,000 in general liability insurance, not a surety bond. Residential and general contracting are not licensed at the state level. Municipal requirements vary and may include bonds.",
    keyFacts: [
      "OCILB licenses 5 commercial trades — electrical, plumbing, HVAC, hydronics, refrigeration",
      "No statewide residential or general contractor license",
      "No statewide contractor license bond",
      "OCILB requires $500,000 in general liability insurance",
      "Cities like Cincinnati, Columbus, Cleveland, and Toledo have local contractor registration",
    ],
    noneContext: `<p>Ohio's approach to contractor regulation is narrow: license five commercial specialty trades at the state level, require insurance instead of a bond, and leave everything else to the cities.</p>
      <p>What the state actually requires:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Five OCILB licenses</strong> — Electrical, plumbing, HVAC, hydronics, and refrigeration contractors working on commercial projects must be licensed by the Ohio Construction Industry Licensing Board. Each trade has its own exam and continuing education requirement.</li>
        <li><strong>$500,000 liability insurance</strong> — Not a bond. The OCILB satisfies its financial responsibility requirement through insurance, which is far more common nationally than most contractors realize.</li>
        <li><strong>No residential or general contractor licensing</strong> — The state does not license residential remodelers, general contractors, or handymen. Those are handled (if at all) by municipalities.</li>
      </ul>
      <p class="mt-4">Cincinnati, Columbus, Cleveland, Toledo, Akron, and Dayton all have their own contractor registration systems, and several of them do require bonds. If you work across multiple Ohio cities, check each jurisdiction's rules separately. The state won't help you here — it has no central registry.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      {
        label: "Ohio Revised Code Chapter 4740",
        url: "https://codes.ohio.gov/ohio-revised-code/chapter-4740",
      },
      {
        label: "OCILB — Contractors & Contracting Companies",
        url: "https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards/ohio-construction-industry-licensing-board/contractors-and-contracting-companies",
      },
      {
        label: "Ohio Department of Commerce — Industrial Compliance",
        url: "https://com.ohio.gov/divisions-and-programs/industrial-compliance",
      },
    ],
  },

  // ─── ARIZONA ────────────────────────────────────────────────────────────
  {
    slug: "arizona",
    name: "Arizona",
    abbreviation: "AZ",
    agency: "Arizona Registrar of Contractors",
    agencyShort: "ROC",
    agencyUrl: "https://roc.az.gov",
    statute: "A.R.S. §32-1152",
    statuteUrl: "https://www.azleg.gov/ars/32/01152.htm",
    structure: "tiered",
    bondAmounts: [
      { label: "Residential General Contractor", amount: 15000, note: "Range $5,000–$15,000; set by ROC based on license class" },
      { label: "Residential Specialty Contractor", amount: 7500, note: "Range $1,000–$7,500" },
      { label: "Commercial General — $1M–$5M annual volume", amount: 15000, note: "Range $7,500–$25,000" },
      { label: "Commercial General — $5M–$10M annual volume", amount: 37500, note: "Range $17,500–$37,500" },
      { label: "Commercial General — $10M+ annual volume", amount: 100000, note: "Range $50,000–$100,000" },
      { label: "Commercial Specialty — $1M–$5M annual volume", amount: 15000, note: "Range $7,500–$25,000" },
      { label: "Commercial Specialty — $5M–$10M annual volume", amount: 37500, note: "Range $17,500–$37,500" },
      { label: "Commercial Specialty — $10M+ annual volume", amount: 50000, note: "Range $37,500–$50,000" },
    ],
    obligee: "State of Arizona — Registrar of Contractors",
    renewalTerm: "2 years (matches license)",
    filingProcess:
      "Arizona's ROC sets your bond amount based on your license classification and estimated annual volume of Arizona work. Residential bonds are tiered by license class (general vs specialty). Commercial bonds are tiered by annual project volume in addition to classification. Dual licenses (residential + commercial) combine both amounts. In addition, residential contractors must either post a $200,000 bond or contribute to the Arizona Residential Contractors' Recovery Fund.",
    keyFacts: [
      "Arizona's contractor bond amount depends on classification AND annual volume",
      "Residential General: $5,000–$15,000",
      "Residential Specialty: $1,000–$7,500",
      "Commercial contractors: bond scales with annual volume up to $100,000",
      "Residential contractors must also pay into the Recovery Fund OR post a $200K bond",
      "License term is 2 years",
    ],
    notes: `<p>Arizona is one of the more complicated contractor bond states because the amount you owe changes based on two things: what classification you're licensed in AND how much work you're doing each year.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Volume tier matters on commercial.</strong> A commercial specialty contractor doing $800K/year pays a $5K–$15K bond. The same contractor doing $6M/year pays $17,500–$37,500. If your volume grows, your bond amount grows with it.</li>
        <li><strong>Residential contractors have the Recovery Fund on top.</strong> The $200,000 Residential Contractors' Recovery Fund isn't a separate bond per se — it's a state-run consumer protection fund that residential contractors fund through their annual fees. But if you want to skip the fund contribution, you can post a $200,000 bond instead. Almost nobody does that.</li>
        <li><strong>Dual license = combined bonds.</strong> If you hold both a residential and commercial license, you post the bond for each classification separately and the totals are combined.</li>
      </ul>`,
    lastVerified: "2026-04-08",
    sources: [
      { label: "Arizona ROC — Bond Information", url: "https://roc.az.gov/bond-information" },
      { label: "Arizona ROC — License Classifications", url: "https://roc.az.gov/license-classifications" },
      { label: "A.R.S. §32-1152 — Bonds", url: "https://www.azleg.gov/ars/32/01152.htm" },
    ],
  },

  // ─── GEORGIA ────────────────────────────────────────────────────────────
  {
    slug: "georgia",
    name: "Georgia",
    abbreviation: "GA",
    agency: "Georgia State Licensing Board for Residential and General Contractors",
    agencyShort: "SLBRGC",
    agencyUrl: "https://sos.ga.gov/georgia-state-licensing-board-residential-and-general-contractors",
    statute: "O.C.G.A. §43-41-6",
    statuteUrl: "https://law.justia.com/codes/georgia/2022/title-43/chapter-41/",
    structure: "alternative",
    bondAmounts: [
      { label: "Residential Basic / Residential Light Commercial", amount: 25000, note: "Alternative to $25,000 net worth requirement" },
      { label: "General Contractor (unlimited tier)", amount: 150000, note: "Alternative to $150,000 net worth requirement" },
    ],
    obligee: "Georgia State Licensing Board for Residential and General Contractors",
    renewalTerm: "2 years (license cycle); bond continuous",
    filingProcess:
      "Georgia licenses residential and general contractors through the SLBRGC. Every licensee must carry general liability insurance of at least $500,000. Financial responsibility can be satisfied by demonstrating net worth OR by posting a surety bond — the bond is an alternative, not a requirement. Residential contractors need $25,000 net worth or a $25,000 bond. General contractors at the unlimited tier need $150,000 net worth or a $150,000 bond. The bond, when used, runs to the Board for the benefit of consumers.",
    keyFacts: [
      "Georgia requires a licensed contractor for most residential and general contracting",
      "Bond is OPTIONAL — it's an alternative to proving net worth",
      "Residential contractors: $25,000 bond OR $25,000 net worth",
      "General contractor unlimited: $150,000 bond OR $150,000 net worth",
      "$500,000 general liability insurance required regardless",
    ],
    alternativeContext: `<p>Georgia is another state where the bond is optional — it exists as an alternative for contractors who can't or don't want to prove the net worth required by the state.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Residential Basic and Residential Light Commercial</strong> need to show $25,000 in net worth OR post a $25,000 surety bond. Most contractors with stable finances just submit financial statements and skip the bond.</li>
        <li><strong>General Contractor (unlimited tier)</strong> requires $150,000 in net worth OR a $150,000 bond. That's a much higher bar, and for contractors who don't have $150,000 sitting on the balance sheet, the bond becomes the only way to qualify.</li>
        <li><strong>Liability insurance is required regardless.</strong> Georgia requires all licensed contractors to carry at least $500,000 in general liability coverage, whether they prove net worth or post a bond. The insurance is separate from the financial responsibility requirement and is mandatory.</li>
      </ul>
      <p class="mt-4">Run the math. A $150,000 bond at 2% premium costs about $3,000/year. Keeping $150,000 of demonstrable net worth locked in your business is a much larger opportunity cost for most contractors. The bond is the cheaper path for a growing general contractor.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      { label: "Georgia SLBRGC", url: "https://sos.ga.gov/georgia-state-licensing-board-residential-and-general-contractors" },
      { label: "O.C.G.A. §43-41 (Contractors)", url: "https://law.justia.com/codes/georgia/2022/title-43/chapter-41/" },
      { label: "Ga. Comp. R. & Regs. Ch. 553-4 (General Contractor Qualifications)", url: "https://rules.sos.state.ga.us/gac/553-4" },
    ],
  },

  // ─── NORTH CAROLINA ─────────────────────────────────────────────────────
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbreviation: "NC",
    agency: "North Carolina Licensing Board for General Contractors",
    agencyShort: "NCLBGC",
    agencyUrl: "https://nclbgc.org",
    statute: "N.C.G.S. §87-10",
    statuteUrl: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_87/GS_87-10.html",
    structure: "alternative",
    bondAmounts: [
      { label: "Limited License (projects up to $750,000)", amount: 175000, note: "Alternative to $17,000 working capital" },
      { label: "Intermediate License (projects up to $1.5M)", amount: 500000, note: "Alternative to $75,000 working capital" },
      { label: "Unlimited License (no project limit)", amount: 1000000, note: "Alternative to $150,000 working capital" },
    ],
    obligee: "North Carolina Licensing Board for General Contractors",
    renewalTerm: "Annual license renewal; bond continuous",
    filingProcess:
      "North Carolina licenses general contractors in three tiers by maximum project value: Limited ($750K max), Intermediate ($1.5M max), and Unlimited. Each tier has a working capital requirement (current assets minus current liabilities). If you can't meet the working capital requirement, you can post a surety bond at the dollar amount specified in N.C.G.S. §87-10(b). The bond amounts are significantly higher than the working capital requirements — meaning the bond is rarely the cheaper path. Most NC contractors qualify via financial statements.",
    keyFacts: [
      "Three license tiers: Limited, Intermediate, Unlimited — based on maximum project value",
      "Limited: $17,000 working capital OR $175,000 bond",
      "Intermediate: $75,000 working capital OR $500,000 bond",
      "Unlimited: $150,000 working capital OR $1,000,000 bond",
      "Bond must be from an A.M. Best-rated surety (A- or better)",
      "Bond amounts are 10x the working capital requirement — bond rarely makes sense",
    ],
    alternativeContext: `<p>North Carolina has one of the most lopsided alternative structures in the country. The bond option exists, but the numbers are designed to push everyone toward proving working capital instead.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Limited License</strong> — Needs $17,000 in working capital (current assets minus current liabilities) OR a <strong>$175,000</strong> bond. That's a 10× ratio. A $175K bond at 2% premium costs $3,500/year. Showing $17K of working capital on a balance sheet costs essentially nothing.</li>
        <li><strong>Intermediate License</strong> — $75,000 working capital OR <strong>$500,000</strong> bond. Same 6-7× ratio. At 2%, that bond is $10,000/year.</li>
        <li><strong>Unlimited License</strong> — $150,000 working capital OR <strong>$1,000,000</strong> bond. At 2% premium, that's $20,000 per year indefinitely.</li>
      </ul>
      <p class="mt-4">For virtually any NC contractor with reasonable finances, the bond is not the cheaper option. Show the working capital on your balance sheet and skip the bond entirely. The bond path is really only for contractors who have ongoing cash-flow problems and can't clean up their books before the license application.</p>
      <p>If you're a new contractor starting fresh, focus on building working capital — it's the right financial discipline for your business anyway, and it's the cheapest path to a NC license.</p>
      <p>For a different take on the same alternative structure, see how <a href="/states/contractor-license-bond/maryland" class="text-accent hover:underline">Maryland handles its MHIC financial solvency requirement</a> — similar idea, much smaller dollar amounts, and tied to a consumer guaranty fund.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      { label: "NCLBGC — Classifications and Limitations", url: "https://nclbgc.org/classifications-and-limitations/" },
      { label: "N.C.G.S. §87-10", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_87/GS_87-10.html" },
      { label: "NCLBGC Laws and Regulations (PDF)", url: "https://nclbgc.org/wp-content/uploads/2020/03/2020_GenCont_LawsAndRegulations.pdf" },
    ],
  },

  // ─── MARYLAND ───────────────────────────────────────────────────────────
  {
    slug: "maryland",
    name: "Maryland",
    abbreviation: "MD",
    agency: "Maryland Home Improvement Commission",
    agencyShort: "MHIC",
    agencyUrl: "https://labor.maryland.gov/license/mhic/",
    statute: "COMAR 09.08.01.19 & MD Bus. Reg. §8-405",
    statuteUrl: "https://regs.maryland.gov/us/md/exec/comar/09.08.01.19",
    structure: "alternative",
    bondAmounts: [
      { label: "Standard MHIC Bond (for applicants lacking net worth)", amount: 20000, note: "Amount tied to the Guaranty Fund maximum per-claim payout" },
    ],
    obligee: "Maryland Home Improvement Commission",
    renewalTerm: "2 years (bond), 2 years (license)",
    filingProcess:
      "The Maryland Home Improvement Commission licenses residential home improvement contractors. Every licensee must demonstrate financial solvency — either by showing net worth equal to the current maximum Guaranty Fund award ($20,000 per claim) OR by posting a 2-year surety bond for the same amount. The bond serves as a backup source of funds for consumer claims that exceed the Guaranty Fund. Contractors who can show sufficient net worth and have clean credit reports can skip the bond entirely.",
    keyFacts: [
      "Maryland's MHIC license is for RESIDENTIAL home improvement contractors only",
      "Bond is REQUIRED only when the applicant cannot demonstrate sufficient net worth",
      "Bond amount equals the Guaranty Fund maximum per-claim payout ($20,000 per COMAR 09.08.01.19)",
      "Credit report is also required; unsatisfied judgments can trigger the bond requirement",
      "The Guaranty Fund (separate from the bond) compensates homeowners up to $20,000 per claim",
      "Some brokers quote $30,000 — verify the current statutory amount with MHIC before filing",
    ],
    alternativeContext: `<p>Maryland's home improvement contractor requirement is unusual because the bond is tied directly to a state-run consumer protection fund.</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>The Guaranty Fund does the heavy lifting.</strong> Every licensed home improvement contractor contributes to the MHIC Guaranty Fund. When a consumer is harmed and files a claim, the Fund pays up to $20,000 per claim (per COMAR 09.08.01.19, tied to MD Business Regulation §8-405(e)(1)). This is separate from the bond.</li>
        <li><strong>The bond is a backup for contractors who can't prove net worth.</strong> Under COMAR 09.08.01.19, applicants who cannot demonstrate sufficient net worth (equal to the maximum Guaranty Fund award) must post a 2-year surety bond in that same amount. Applicants with strong financials and clean credit reports skip the bond entirely.</li>
        <li><strong>Credit report matters as much as net worth.</strong> MHIC pulls your credit report at application. Unsatisfied judgments or open liens can trigger the bond requirement even if your balance sheet looks fine on paper.</li>
        <li><strong>Verify the current amount before filing.</strong> The bond amount is tied by regulation to the Fund's maximum payout. Historically this has been $20,000 but some sources quote $30,000. Call MHIC (410-230-6231) to confirm the current required amount before buying the bond.</li>
      </ul>`,
    lastVerified: "2026-04-08",
    sources: [
      { label: "Maryland MHIC — Main", url: "https://labor.maryland.gov/license/mhic/" },
      { label: "Maryland MHIC — Licensing FAQ", url: "https://labor.maryland.gov/license/mhic/mhicfaqlic.shtml" },
      { label: "COMAR 09.08.01.19 — Financial Solvency", url: "https://regs.maryland.gov/us/md/exec/comar/09.08.01.19" },
    ],
  },

  // ─── INDIANA ────────────────────────────────────────────────────────────
  {
    slug: "indiana",
    name: "Indiana",
    abbreviation: "IN",
    agency: "Indiana Professional Licensing Agency (no statewide GC license)",
    agencyShort: "IPLA",
    agencyUrl: "https://www.in.gov/pla/",
    statute: "No statewide general contractor licensing statute",
    structure: "none",
    bondAmounts: [],
    obligee: "N/A statewide — municipal bonds vary",
    renewalTerm: "N/A statewide",
    filingProcess:
      "Indiana does not license general contractors at the state level and does not require a statewide contractor license bond. Indiana licenses specific trades (plumbers, HVAC, electricians) through trade-specific boards, most of which require insurance rather than a surety bond. All general contractor regulation is handled by cities and counties. The largest municipal bond requirements are in Indianapolis ($10,000), Evansville-Vanderburgh County ($25,000), and Lake County ($5,000 minimum).",
    keyFacts: [
      "No statewide general contractor license in Indiana",
      "No statewide contractor license bond",
      "Plumbers and some trades licensed statewide — insurance required, not bond",
      "Indianapolis: $10,000 General Contractor bond",
      "Evansville-Vanderburgh County: $25,000 bond",
      "Lake County: $5,000 minimum bond",
    ],
    noneContext: `<p>Indiana has no statewide general contractor licensing. There's no state exam, no state registration, and no state bond. If someone is selling you an "Indiana contractor bond," they're almost certainly selling you a city-specific bond without telling you which city.</p>
      <p>Here's how it actually works in Indiana:</p>
      <ul class="list-disc pl-6 space-y-2 mt-3">
        <li><strong>Trade licenses at the state level.</strong> Plumbers are licensed by the Indiana Plumbing Commission. HVAC contractors in some counties need local certification. Electricians are usually licensed at the municipal level. None of these require a state-level surety bond — insurance is the typical requirement.</li>
        <li><strong>Indianapolis</strong> requires a General Contractor license with a $10,000 bond for work inside the city.</li>
        <li><strong>Evansville-Vanderburgh County</strong> requires a $25,000 contractor bond for work in the county.</li>
        <li><strong>Lake County</strong> requires contractor registration with a $5,000 minimum bond.</li>
        <li><strong>Fort Wayne, South Bend, Bloomington, and other cities</strong> have their own contractor registration rules — some with bonds, some without.</li>
      </ul>
      <p class="mt-4">If you work across multiple Indiana jurisdictions, you'll need to file bonds in each one that requires them. There's no single license that covers the whole state.</p>`,
    lastVerified: "2026-04-08",
    sources: [
      { label: "Indiana Professional Licensing Agency", url: "https://www.in.gov/pla/" },
      { label: "City of Indianapolis — Business Licensing", url: "https://www.indy.gov/activity/starting-a-business" },
      { label: "Indiana DPW Form — Contractor's Bond", url: "https://forms.in.gov/download.aspx?id=8543" },
    ],
  },
];

export const stateBondsBySlug: Record<string, StateBond> = Object.fromEntries(
  stateBonds.map((s) => [s.slug, s])
);

// ─── CREDIT TIER PREMIUM MATH ───────────────────────────────────────────────
// Industry-standard surety rate ranges. Applied against a bond amount to
// compute annual premium ranges for each credit tier.

export interface CreditTier {
  label: string;        // e.g. "Excellent (720+)"
  minRate: number;      // e.g. 0.01 = 1%
  maxRate: number;      // e.g. 0.02 = 2%
}

export const creditTiers: CreditTier[] = [
  { label: "Excellent (720+)",  minRate: 0.01, maxRate: 0.02 },
  { label: "Good (680–719)",    minRate: 0.02, maxRate: 0.035 },
  { label: "Fair (620–679)",    minRate: 0.04, maxRate: 0.06 },
  { label: "Poor (580–619)",    minRate: 0.06, maxRate: 0.08 },
  { label: "Bad (Below 580)",   minRate: 0.08, maxRate: 0.10 },
];

export function formatMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function premiumRange(bondAmount: number, tier: CreditTier): string {
  const low = Math.round(bondAmount * tier.minRate);
  const high = Math.round(bondAmount * tier.maxRate);
  return `${formatMoney(low)} – ${formatMoney(high)}`;
}
