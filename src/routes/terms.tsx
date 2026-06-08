import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Paradigm Peptides LLC" }] }),
  component: () => (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Terms of Service</h1>
      <p className="mt-6 text-muted-foreground">By accessing or purchasing from Paradigm Peptides LLC, you agree to these terms.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Eligibility</h2>
      <p className="mt-2 text-muted-foreground">You must be 21 years of age or older and a qualified researcher to purchase from this site.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Intended use</h2>
      <p className="mt-2 text-muted-foreground">All products are sold strictly for in-vitro laboratory and research use. They are not for human or animal consumption, diagnostic, or therapeutic use.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Liability</h2>
      <p className="mt-2 text-muted-foreground">Paradigm Peptides LLC is not liable for misuse of any product. Buyer accepts full responsibility for proper handling and use.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Changes</h2>
      <p className="mt-2 text-muted-foreground">These terms may update from time to time. Continued use of the site constitutes acceptance.</p>
    </article>
  ),
});
