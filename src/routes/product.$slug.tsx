import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductBySlug } from "@/lib/db";
import { ResearchNotice } from "@/components/ResearchNotice";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/site";
import { FlaskConical, Minus, Plus, ShoppingCart, ShieldCheck, Truck, Atom } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Paradigm Peptides LLC` },
      { name: "description", content: "Research-grade compound. Third-party tested. For laboratory use only." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  if (isLoading) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading…</div>;
  if (!product) throw notFound();

  const handleAdd = () => {
    add(
      { id: product.id, slug: product.slug, name: product.name, price: Number(product.price), image_url: product.image_url },
      qty,
    );
    toast.success(`Added ${qty}× ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> ·{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="aspect-square w-full object-cover" />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <FlaskConical className="h-32 w-32 text-primary/30" />
            </div>
          )}
        </div>

        <div>
          <div className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary">
            {product.category}
          </div>
          <h1 className="font-display mt-4 text-4xl font-bold">{product.name}</h1>
          {product.short_description && (
            <p className="mt-3 text-muted-foreground">{product.short_description}</p>
          )}

          <div className="my-6 flex items-center gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.in_stock ? (
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
              disabled={!product.in_stock}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
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

      {product.description && (
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Research Notes</div>
          <h2 className="font-display mt-2 text-2xl font-bold">About {product.name}</h2>
          <div className="prose prose-invert mt-4 max-w-3xl text-muted-foreground">
            {product.description.split(/\.\s+/).slice(0, 8).map((s, i) => (
              <p key={i} className="mb-3 leading-relaxed">{s.trim()}.</p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
