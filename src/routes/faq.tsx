import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Paradigm Peptides LLC" }, { name: "description", content: "Common questions about our research compounds, shipping, payments, and lab results." }] }),
  component: FAQ,
});

const FAQS = [
  { q: "What are these products for?", a: "All compounds sold by Paradigm Peptides LLC are intended strictly for in-vitro laboratory and research use. They are not for human or animal consumption." },
  { q: "Are your products third-party tested?", a: "Yes. Every batch we stock is verified by independent HPLC and mass-spectrometry analysis. COAs are available on our Lab Results page." },
  { q: "How fast do orders ship?", a: "Orders typically ship within 1–2 business days from the US, sent discreetly with tracking." },
  { q: "Do you offer free shipping?", a: "Yes — domestic orders over $150 ship free." },
  { q: "What payment methods do you accept?", a: "We accept major cards, Venmo, and Cash App. Payment instructions are sent after order placement for Venmo/Cash App." },
  { q: "Do you ship internationally?", a: "We currently focus on US shipping. Contact us for international inquiries." },
  { q: "Can I return an order?", a: "Due to the nature of research compounds, all sales are final. We replace any product that arrives damaged or incorrect — see our Shipping & Returns page." },
  { q: "How should I store these compounds?", a: "Storage varies by compound. Most peptides are best stored cold and reconstituted per standard research protocols. Consult your lab's SOPs." },
];

function FAQ() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">FAQ</div>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Frequently asked questions</h1>
      <div className="mt-8">
        <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="font-display text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
