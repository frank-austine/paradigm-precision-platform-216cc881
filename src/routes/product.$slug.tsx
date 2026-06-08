import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductBySlug } from "@/lib/db";
import { ResearchNotice } from "@/components/ResearchNotice";
import { useCart } from "@/lib/cart";
import { formatPrice, SITE } from "@/lib/site";
import { FlaskConical, Minus, Plus, ShoppingCart, ShieldCheck, Truck, Atom } from "lucide-react";
import { toast } from "sonner";

type SeoOverride = {
  title: string;
  description: string;
  h1: string;
  introPrefix?: string;
  ctaLabel?: string;
};

const SEO_OVERRIDES: Record<string, SeoOverride> = {
  retatrutide: {
    title: "Retatrutide — Where to Buy Research-Grade Peptide | Paradigm Peptides",
    description:
      "Looking for peptide retatrutide where to buy? Paradigm Peptides supplies research-grade Retatrutide with ≥98% purity and independent third-party testing.",
    h1: "Retatrutide — Where to Buy Research-Grade Peptide",
    introPrefix:
      "If you're searching for peptide retatrutide where to buy, Paradigm Peptides supplies research-grade Retatrutide for laboratory study.",
  },
  "lgd-4033": {
    title: "LGD-4033 For Sale — Research-Grade SARM | Paradigm Peptides",
    description:
      "Buy LGD-4033 from Paradigm Peptides — research-grade SARM, ≥98% purity, third-party tested, fast US shipping.",
    h1: "LGD-4033 For Sale",
    introPrefix:
      "Paradigm Peptides offers lgd 4033 for sale as a research-grade SARM, independently tested for ≥98% purity for laboratory study.",
    ctaLabel: "Buy LGD-4033",
  },
  "mk-677": {
    title: "MK-677 Buy — Research-Grade Compound | Paradigm Peptides",
    description:
      "MK-677 buy from Paradigm Peptides — research-grade compound with ≥98% purity, third-party verified, discreet US shipping.",
    h1: "MK-677 — Buy Research-Grade Compound",
    introPrefix:
      "Researchers looking for mk-677 buy options trust Paradigm Peptides for a third-party tested, research-grade compound.",
  },
  thymalin: {
    title: "Thymalin Buy — Research Peptide | Paradigm Peptides",
    description:
      "Thymalin buy from Paradigm Peptides — research-grade peptide, ≥98% purity, independently tested, fast US shipping.",
    h1: "Thymalin — Buy Research-Grade Peptide",
    introPrefix:
      "Paradigm Peptides offers thymalin buy options for research laboratories — independently tested at ≥98% purity.",
  },
};

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const product = await fetchProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    const override = SEO_OVERRIDES[params.slug];
    const product = loaderData?.product;
    const name = product?.name ?? params.slug.replace(/-/g, " ");
    const category = product?.category ?? "Compound";
    const singular =
      category === "Peptides"
        ? "Peptide"
        : category === "SARMs"
        ? "SARM"
        : category === "Nootropics"
        ? "Nootropic"
        : "Compound";
    const title =
      override?.title ?? `${name} — Research-Grade ${singular} | Paradigm Peptides`;
    const description =
      override?.description ??
      `${name} from Paradigm Peptides — research-grade ${singular.toLowerCase()}, ≥98% purity, third-party tested. For research and laboratory use only.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
        ...(product?.image_url ? [{ property: "og:image", content: product.image_url }] : []),
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const { data = product } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    initialData: product,
  });
  const p = data!;

  const override = SEO_OVERRIDES[slug];
  const categorySlug =
    SITE.categories.find((c) => c.db === p.category)?.slug ?? "peptides";

  const handleAdd = () => {
    add(
      { id: p.id, slug: p.slug, name: p.name, price: Number(p.price), image_url: p.image_url },
      qty,
    );
    toast.success(`Added ${qty}× ${p.name} to cart`);
  };

  const intro = override?.introPrefix
    ? `${override.introPrefix} ${p.short_description ?? ""}`.trim()
    : p.short_description ?? "";

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> ·{" "}
        <Link to="/category/$slug" params={{ slug: categorySlug }} className="hover:text-primary">
          {p.category}
        </Link>{" "}·{" "}
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background">
          {p.image_url ? (
            <img src={p.image_url} alt={p.name} className="aspect-square w-full object-cover" />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <FlaskConical className="h-32 w-32 text-primary/30" />
            </div>
          )}
        </div>

        <div>
          <div className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary">
            {p.category}
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold">{override?.h1 ?? p.name}</h1>
          {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}

          <div className="my-6 flex items-center gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatPrice(p.price)}</span>
            {p.in_stock ? (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-mono uppercase text-primary">In stock</span>
            ) : (
              <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-mono uppercase text-destructive">Out of stock</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:text-primary"><Minus className="h-4 w-4" /></button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-transparent text-center text-sm"
              />
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:text-primary"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!p.in_stock}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" /> {override?.ctaLabel ?? "Add to cart"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3">
              <ShieldCheck className="h-4 w-4 text-primary" /> 3rd-party tested
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3">
              <Atom className="h-4 w-4 text-primary" /> 99%+ purity
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3">
              <Truck className="h-4 w-4 text-primary" /> Discreet ship
            </div>
          </div>

          <div className="mt-6"><ResearchNotice /></div>
        </div>
      </div>

      {p.description && (
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Research Notes</div>
          <h2 className="font-display mt-2 text-2xl font-bold">About {p.name}</h2>
          <div className="prose prose-invert mt-4 max-w-3xl text-muted-foreground">
            {p.description.split(/\.\s+/).slice(0, 8).map((s, i) => (
              <p key={i} className="mb-3 leading-relaxed">{s.trim()}.</p>
            ))}
          </div>
          <div className="mt-8 text-sm">
            <Link to="/category/$slug" params={{ slug: categorySlug }} className="text-primary hover:underline">
              ← Back to {p.category}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
