export const SITE = {
  name: "Paradigm Peptides LLC",
  tagline: "Research-grade compounds. Tested. Trusted.",
  freeShippingThreshold: 150,
  contactEmail: "support@paradigmpeptides.com",
  contactHours: "Available 24/7",
  categories: [
    { slug: "peptides", label: "Peptides", db: "Peptides" },
    { slug: "sarms", label: "SARMs", db: "SARMs" },
    { slug: "nootropics", label: "Nootropics", db: "Nootropics" },
    { slug: "lab-supplies", label: "Lab Supplies", db: "Lab Supplies" },
  ],
};

export const RESEARCH_NOTICE =
  "For research and laboratory use only. Not for human or animal consumption.";

export function formatPrice(n: number | string) {
  const v = typeof n === "string" ? parseFloat(n) : n;
  return `$${v.toFixed(2)}`;
}
