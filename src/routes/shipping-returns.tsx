import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({ meta: [{ title: "Shipping & Returns — Paradigm Peptides LLC" }, { name: "description", content: "Shipping policy, delivery times, and returns for research compounds." }] }),
  component: Page,
});

function Page() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Policy</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Shipping & Returns</h1>

      <h2 className="font-display mt-10 text-xl font-bold">Shipping</h2>
      <p className="mt-2 text-muted-foreground">Orders ship from the US within 1–2 business days of payment confirmation, packed discreetly with tracking. Domestic orders over $150 ship free; otherwise standard shipping is $15.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Delivery times</h2>
      <p className="mt-2 text-muted-foreground">Most US orders arrive within 3–5 business days after dispatch. Tracking updates are emailed once the package leaves our facility.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Returns</h2>
      <p className="mt-2 text-muted-foreground">Because these compounds are intended strictly for in-vitro research use, all sales are final once an order ships. If a package arrives damaged, incorrect, or otherwise compromised, contact us within 7 days of delivery for a free replacement.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Lost or stuck packages</h2>
      <p className="mt-2 text-muted-foreground">If tracking has not updated for 7 business days, email us with your order number and we'll investigate or reship at our cost.</p>
    </article>
  );
}
