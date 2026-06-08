import { createFileRoute } from "@tanstack/react-router";
import { ResearchNotice } from "@/components/ResearchNotice";
import { Microscope, Atom, ShieldCheck, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Paradigm Peptides LLC" }, { name: "description", content: "Paradigm Peptides LLC supplies third-party tested research compounds to laboratories and serious researchers." }] }),
  component: About,
});

function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">About</div>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Built for researchers, by researchers.</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Paradigm Peptides LLC supplies the modern research laboratory with high-purity peptides, SARMs,
        nootropics, and lab supplies. Every batch is independently verified, every shipment discreetly
        packed, and every question answered by real humans.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          { icon: Microscope, t: "Quality first", d: "We source from accredited synthesis labs and require COAs on every lot." },
          { icon: Atom, t: "99%+ purity", d: "Independent HPLC and mass-spec analysis on every batch we receive." },
          { icon: ShieldCheck, t: "Transparent", d: "Public lab results, clear documentation, no marketing fluff." },
          { icon: FlaskConical, t: "Research only", d: "Our products are sold strictly for in-vitro research and laboratory use." },
        ].map((f) => (
          <div key={f.t} className="rounded-xl border border-border bg-card p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="font-display mt-3 text-lg font-bold">{f.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12"><ResearchNotice /></div>
    </div>
  );
}
