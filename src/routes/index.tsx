import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SITE } from "@/lib/site";
import { Beaker, ShieldCheck, Truck, FlaskConical, Microscope, Atom } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paradigm Peptides LLC — Research-Grade Peptides, SARMs & Nootropics" },
      { name: "description", content: "Third-party tested peptides, SARMs, nootropics & lab supplies for serious researchers. Fast US shipping, transparent COAs." },
      { property: "og:title", content: "Paradigm Peptides LLC" },
      { property: "og:description", content: "Third-party tested peptides, SARMs, nootropics & lab supplies." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: () => fetchProducts({ featured: true, limit: 8 }),
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary">
              <Atom className="h-3 w-3" /> Third-Party Tested · 99%+ Purity
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Research-Grade <span className="text-gradient-cyan">Compounds.</span>
              <br />Tested. Trusted.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Peptides, SARMs, nootropics, and lab supplies for the modern research laboratory.
              Every batch verified by independent third-party analysis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90"
              >
                Browse Catalog
              </Link>
              <Link
                to="/lab-results"
                className="rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60"
              >
                View Lab Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-surface">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "Third-Party Tested", sub: "Independent COAs" },
            { icon: Truck, label: `Free Shipping $${SITE.freeShippingThreshold}+`, sub: "Discreet US shipping" },
            { icon: Microscope, label: "Research Grade", sub: "99%+ verified purity" },
            { icon: Beaker, label: "Available 24/7", sub: "Real human support" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.label}</div>
                <div className="text-xs text-muted-foreground">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Catalog</div>
            <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Shop by category</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-primary hover:underline md:block">
            View all products →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:ring-cyan-glow"
            >
              <FlaskConical className="h-8 w-8 text-primary" />
              <div className="mt-6 font-display text-xl font-bold">{c.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Featured</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Most researched</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <ResearchNotice />
      </section>
    </div>
  );
}
