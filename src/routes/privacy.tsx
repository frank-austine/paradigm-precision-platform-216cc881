import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Paradigm Peptides LLC" }] }),
  component: () => (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-6 text-muted-foreground">Paradigm Peptides LLC collects only the information needed to process orders and respond to inquiries: name, email, shipping address, phone (optional), and order details.</p>
      <h2 className="font-display mt-8 text-xl font-bold">What we collect</h2>
      <p className="mt-2 text-muted-foreground">Contact info, shipping address, and order history. We do not sell or share customer data with third parties for marketing.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Payments</h2>
      <p className="mt-2 text-muted-foreground">Payment information for card transactions is processed by trusted third-party processors. We do not store full card numbers.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Cookies</h2>
      <p className="mt-2 text-muted-foreground">We use a small amount of browser storage to remember your cart and your acceptance of the research disclaimer.</p>
      <h2 className="font-display mt-8 text-xl font-bold">Contact</h2>
      <p className="mt-2 text-muted-foreground">Email support@paradigmpeptides.com for any data requests.</p>
    </article>
  ),
});
