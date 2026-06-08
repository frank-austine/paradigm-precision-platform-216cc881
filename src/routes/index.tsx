import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { SITE } from "@/lib/site";
import {
  FlaskConical,
  Microscope,
  ShieldCheck,
  Lock,
  Truck,
  Undo2,
  BadgeCheck,
  Flag,
} from "lucide-react";

const TITLE = "Paradigm Peptides | Research-Grade Compounds";
const DESCRIPTION =
  "Paradigm Peptides supplies pharmaceutical-grade research compounds including Peptides, SARMs, Nootropics, and Lab Supplies. ≥98% purity guaranteed.";

const CATEGORY_COPY: Record<string, string> = {
  peptides: "Pharmaceutical-grade peptides for advanced biological research",
  sarms: "Selective androgen receptor modulators for muscle and bone studies",
  nootropics: "Cognitive compounds supporting memory and focus research",
  "lab-supplies": "Bacteriostatic water, syringes, vials, and reconstitution essentials",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-home"],
    queryFn: () => fetchProducts({ featured: true, limit: 8 }),
  });

  return (
    <div>
      {/* Hero — WHO WE ARE */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary">
              <BadgeCheck className="h-3 w-3" /> Trusted since 2014 · ≥98% Purity
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Paradigm Peptides —{" "}
              <span className="text-gradient-cyan">Research-Grade Compounds</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Trusted by researchers since 2014. Pharmaceutical-grade Peptides, SARMs, Nootropics,
              and Lab Supplies — independently tested, ≥98% purity guaranteed.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Every paradigm peptide and compound in our catalog ships with documented purity so
              your laboratory work starts on solid ground.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/60"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border bg-surface">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-5">
          {[
            { icon: Flag, label: "USA Manufactured" },
            { icon: Microscope, label: "≥98% Purity Verified" },
            { icon: Lock, label: "Secure SSL Checkout" },
            { icon: Truck, label: "Fast Tracked Shipping" },
            { icon: Undo2, label: "Hassle-Free Returns" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Catalog</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">What We Offer</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.categories.map((c) => (
            <div
              key={c.slug}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:ring-cyan-glow"
            >
              <FlaskConical className="h-8 w-8 text-primary" />
              <div className="mt-5 font-display text-xl font-bold">{c.label}</div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {CATEGORY_COPY[c.slug]}
              </p>
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="mt-4 inline-flex w-fit rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20"
              >
                Browse →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Featured</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">
            Bestselling Research Compounds
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
            View All Products →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Why Us</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">
            Why Researchers Choose Paradigm Peptides
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Microscope,
              title: "Quality You Can Verify",
              body: "Every compound we sell is independently tested and ships with a Certificate of Analysis. Our products meet or exceed 98% purity — because your research depends on it.",
            },
            {
              icon: ShieldCheck,
              title: "A Decade of Experience",
              body: "Founded in 2014, we've been supplying the research community for over a decade. We partner exclusively with US-based manufacturers who meet our strict quality standards.",
            },
            {
              icon: Lock,
              title: "Secure and Simple Ordering",
              body: "SSL-encrypted checkout, multiple payment options including Venmo and CashApp, fast tracked shipping, and a straightforward return policy. We make ordering simple so you can focus on your work.",
            },
          ].map((col, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/40">
                <col.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{col.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{col.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer banner */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 py-6 text-center text-xs leading-relaxed text-muted-foreground">
          All products sold by Paradigm Peptides are strictly for research and laboratory use only.
          They are not intended for human or animal consumption, medical use, or therapeutic
          application. These statements have not been evaluated by the FDA.
        </div>
      </section>
    </div>
  );
}
