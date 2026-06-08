import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { ResearchNotice } from "@/components/ResearchNotice";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = SITE.categories.find((x) => x.slug === params.slug);
    const label = c?.label ?? "Category";
    return {
      meta: [
        { title: `${label} — Paradigm Peptides LLC` },
        { name: "description", content: `Research-grade ${label.toLowerCase()} for laboratory use.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = SITE.categories.find((c) => c.slug === slug);
  if (!cat) throw notFound();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "cat", cat.db],
    queryFn: () => fetchProducts({ category: cat.db }),
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">Category</div>
        <h1 className="font-display mt-2 text-4xl font-bold">{cat.label}</h1>
        <p className="mt-2 text-muted-foreground">{products.length} products in this category</p>
      </div>
      {isLoading ? (
        <div className="py-20 text-center text-muted-foreground">Loading…</div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No products yet in this category. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      <div className="mt-12"><ResearchNotice /></div>
    </div>
  );
}
