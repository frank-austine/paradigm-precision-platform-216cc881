import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProducts } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — All Products | Paradigm Peptides LLC" },
      { name: "description", content: "Browse all research-grade peptides, SARMs, nootropics and lab supplies." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");
  const [sort, setSort] = useState<"name" | "price-asc" | "price-desc">("name");
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(),
  });

  const filtered = products
    .filter((p) => (cat ? p.category === cat : true))
    .filter((p) => (q ? p.name.toLowerCase().includes(q.toLowerCase()) : true))
    .sort((a, b) => {
      if (sort === "price-asc") return Number(a.price) - Number(b.price);
      if (sort === "price-desc") return Number(b.price) - Number(a.price);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">Catalog</div>
        <h1 className="font-display mt-2 text-4xl font-bold">All Products</h1>
        <p className="mt-2 text-muted-foreground">{products.length} research compounds available</p>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search compounds…"
          className="rounded-md border border-border bg-card px-4 py-2.5 text-sm"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-md border border-border bg-card px-4 py-2.5 text-sm"
        >
          <option value="">All categories</option>
          {SITE.categories.map((c) => (
            <option key={c.slug} value={c.db}>{c.label}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-md border border-border bg-card px-4 py-2.5 text-sm"
        >
          <option value="name">Sort: Name</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-muted-foreground">Loading catalog…</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No products match your search.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <div className="mt-12">
        <ResearchNotice />
      </div>
    </div>
  );
}
