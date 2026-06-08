import { createFileRoute } from "@tanstack/react-router";
import { ResearchNotice } from "@/components/ResearchNotice";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Research Disclaimer — Paradigm Peptides LLC" }] }),
  component: () => (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Research Disclaimer</h1>
      <div className="mt-6"><ResearchNotice /></div>
      <p className="mt-6 text-muted-foreground">All products sold by Paradigm Peptides LLC are intended for laboratory research purposes only. They have not been evaluated or approved by the FDA for any therapeutic, diagnostic, or human use.</p>
      <p className="mt-4 text-muted-foreground">By purchasing, you confirm you are a qualified researcher and that the products will not be used on humans or animals or for any in-vivo use.</p>
      <p className="mt-4 text-muted-foreground">Paradigm Peptides LLC is not liable for damages arising from misuse of any product. Users are solely responsible for compliance with all applicable laws and regulations in their jurisdiction.</p>
    </article>
  ),
});
