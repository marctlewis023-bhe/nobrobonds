export interface BondType {
  slug: string;
  title: string;
  oneLiner: string;
  icon: string;
  description: string;
  category: "construction" | "commercial" | "court" | "license";
  rateRange: [number, number];
}

export const bondTypes: BondType[] = [
  {
    slug: "performance-bonds",
    title: "Performance Bonds",
    oneLiner: "Guarantees you'll finish the job — or the surety will make it right.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    description: "Required on most public and many private construction projects, performance bonds guarantee project completion according to contract terms.",
    category: "construction",
    rateRange: [1, 3],
  },
  {
    slug: "bid-bonds",
    title: "Bid Bonds",
    oneLiner: "Proves you're serious about your bid — and can back it up.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    description: "Bid bonds guarantee that if you win a contract, you'll enter into it at the bid price and provide the required performance and payment bonds.",
    category: "construction",
    rateRange: [0, 3],
  },
  {
    slug: "license-bonds",
    title: "License & Permit Bonds",
    oneLiner: "The bond your state requires before you can legally operate.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    description: "Required by state and local governments to obtain business licenses. These bonds ensure compliance with regulations and protect the public.",
    category: "license",
    rateRange: [1, 10],
  },
  {
    slug: "payment-bonds",
    title: "Payment Bonds",
    oneLiner: "Ensures subs and suppliers get paid — even if the GC doesn't.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    description: "Payment bonds protect subcontractors, laborers, and material suppliers by guaranteeing they'll be paid for their work on a bonded project.",
    category: "construction",
    rateRange: [1, 3],
  },
  {
    slug: "permit-bonds",
    title: "Permit Bonds",
    oneLiner: "Required before a government agency issues a permit for regulated activity.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    description: "Permit bonds guarantee the permit holder will comply with all regulations and restore any public property disturbed during permitted activities.",
    category: "commercial",
    rateRange: [1, 10],
  },
  {
    slug: "court-bonds",
    title: "Court Bonds",
    oneLiner: "Required by courts to protect parties in legal proceedings.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    description: "Court bonds — including appeal bonds, injunction bonds, and fiduciary bonds — are required during various legal proceedings to protect involved parties.",
    category: "court",
    rateRange: [2, 5],
  },
  {
    slug: "customs-bonds",
    title: "Customs Bonds",
    oneLiner: "Required by CBP for businesses importing goods into the United States.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    description: "Required by U.S. Customs and Border Protection for all commercial imports over $2,500. Guarantees payment of duties, taxes, and compliance with customs regulations.",
    category: "commercial",
    rateRange: [1, 5],
  },
  {
    slug: "fidelity-bonds",
    title: "Fidelity Bonds",
    oneLiner: "Protects your business from employee theft, fraud, and dishonesty.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    description: "Fidelity bonds protect businesses from financial losses caused by employee dishonesty. Unlike most surety bonds, they protect the buyer rather than a third party.",
    category: "commercial",
    rateRange: [0.5, 3],
  },
];

export const bondTypesBySlug: Record<string, BondType> = {};
for (const bt of bondTypes) {
  bondTypesBySlug[bt.slug] = bt;
}
