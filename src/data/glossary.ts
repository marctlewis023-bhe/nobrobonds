export interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: "Surety Bond",
    slug: "surety-bond",
    definition:
      "A three-party agreement where a surety company guarantees to an obligee that a principal will fulfill their obligations. If the principal fails, the surety pays the claim and seeks reimbursement from the principal.",
  },
  {
    term: "Premium",
    slug: "premium",
    definition:
      "The annual cost you pay for a surety bond, typically 1–15% of the total bond amount. Your rate depends on credit score, financials, and bond type.",
  },
  {
    term: "Bond Amount",
    slug: "bond-amount",
    definition:
      "The maximum dollar amount of protection a surety bond provides. This is NOT what you pay — your premium is a percentage of this amount.",
  },
  {
    term: "Principal",
    slug: "principal",
    definition:
      "The person or business that purchases the surety bond and is required to fulfill the obligation it guarantees.",
  },
  {
    term: "Obligee",
    slug: "obligee",
    definition:
      "The party that requires the bond — typically a government agency, project owner, or regulatory body that needs financial protection.",
  },
  {
    term: "Surety",
    slug: "surety",
    definition:
      "The insurance company or surety company that issues the bond and guarantees payment to the obligee if the principal defaults.",
  },
  {
    term: "Indemnity Agreement",
    slug: "indemnity-agreement",
    definition:
      "A legal contract where the principal (and often their spouse or business partners) agrees to repay the surety for any claims paid out on the bond.",
  },
  {
    term: "Underwriting",
    slug: "underwriting",
    definition:
      "The process a surety uses to evaluate your risk — reviewing credit, financials, experience, and work history to determine your premium rate.",
  },
  {
    term: "Penal Sum",
    slug: "penal-sum",
    definition:
      "Another term for bond amount — the maximum liability the surety assumes under the bond.",
  },
  {
    term: "Broker Commission",
    slug: "broker-commission",
    definition:
      "The percentage of your premium that goes to the bond broker or agent, typically 20–30%. This is built into your rate — you're already paying it.",
  },
  {
    term: "Bid Bond",
    slug: "bid-bond",
    definition:
      "A bond submitted with a construction bid that guarantees the contractor will honor their bid price and enter into the contract if awarded.",
  },
  {
    term: "Performance Bond",
    slug: "performance-bond",
    definition:
      "A bond guaranteeing that a contractor will complete a project according to the contract terms. If they fail, the surety pays to complete the work.",
  },
  {
    term: "Payment Bond",
    slug: "payment-bond",
    definition:
      "A bond guaranteeing that a contractor will pay their subcontractors, laborers, and material suppliers on a project.",
  },
  {
    term: "License Bond",
    slug: "license-bond",
    definition:
      "A bond required to obtain or maintain a professional or business license, protecting the public from fraudulent or unethical business practices.",
  },
  {
    term: "Claim",
    slug: "claim",
    definition:
      "A formal demand made against a surety bond when the principal fails to meet their obligations. The surety investigates and may pay the obligee.",
  },
  {
    term: "Bond Form",
    slug: "bond-form",
    definition:
      "The specific legal document that defines the terms, conditions, and obligations of a surety bond. Each obligee may have their own required form.",
  },
  {
    term: "Treasury List",
    slug: "treasury-list",
    definition:
      "The U.S. Department of Treasury's list of approved surety companies authorized to provide bonds on federal projects (Circular 570).",
  },
  {
    term: "Aggregate Limit",
    slug: "aggregate-limit",
    definition:
      "The maximum total bonding capacity a surety will extend to a single contractor across all active bonds and projects.",
  },
  {
    term: "Work-in-Progress",
    slug: "work-in-progress",
    definition:
      "A schedule showing all current projects, their contract values, completion percentages, and remaining balances — used in underwriting to assess capacity.",
  },
  {
    term: "Bonding Capacity",
    slug: "bonding-capacity",
    definition:
      "The maximum amount of bonded work a contractor can have outstanding at one time, determined by their financial strength and track record.",
  },
  {
    term: "Contingent Commission",
    slug: "contingent-commission",
    definition:
      "A bonus commission paid to brokers when the bonds they place have low claims. This creates a conflict of interest that is rarely disclosed to the bond buyer.",
  },
  {
    term: "Subagent",
    slug: "subagent",
    definition:
      "A bond agent who works under a larger agency and shares the commission. Adds another middleman layer to the cost of your bond.",
  },
  {
    term: "Processing Fee",
    slug: "processing-fee",
    definition:
      "A flat fee some brokers charge on top of the premium for paperwork. The surety does not require it — it goes straight to the broker as pure profit.",
  },
  {
    term: "Personal Guarantee",
    slug: "personal-guarantee",
    definition:
      "A commitment by a business owner to be personally responsible for repaying any bond claims, putting personal assets at risk.",
  },
  {
    term: "Customs Bond",
    slug: "customs-bond",
    definition:
      "A bond required by U.S. Customs and Border Protection for importing goods into the United States, guaranteeing payment of all duties and compliance.",
  },
  {
    term: "Court Bond",
    slug: "court-bond",
    definition:
      "A bond required by a court during legal proceedings, including appeal bonds, guardian bonds, and fiduciary bonds.",
  },
  {
    term: "Contract Bond",
    slug: "contract-bond",
    definition:
      "A category of surety bonds used in construction: bid bonds, performance bonds, and payment bonds. They guarantee contractors will fulfill contract terms.",
  },
  {
    term: "Commercial Bond",
    slug: "commercial-bond",
    definition:
      "A broad category of surety bonds required by government agencies for licensing, permits, and regulatory compliance.",
  },
  {
    term: "SBA Bond Guarantee Program",
    slug: "sba-bond-guarantee-program",
    definition:
      "A federal program where the SBA guarantees surety bonds for small and emerging contractors who might not qualify on their own.",
  },
  {
    term: "Supersedeas Bond",
    slug: "supersedeas-bond",
    definition:
      "A court bond that lets you appeal a judgment without paying it immediately. Guarantees payment of the judgment plus interest if the appeal fails.",
  },
  {
    term: "Fidelity Bond",
    slug: "fidelity-bond",
    definition:
      "A bond protecting a business from employee theft, fraud, or dishonesty. Unlike most surety bonds, it protects the buyer rather than a third party.",
  },
];

export const glossaryBySlug: Record<string, GlossaryEntry> = {};
export const glossaryByTerm: Record<string, GlossaryEntry> = {};

for (const entry of glossary) {
  glossaryBySlug[entry.slug] = entry;
  glossaryByTerm[entry.term.toLowerCase()] = entry;
}
