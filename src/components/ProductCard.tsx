import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { formatPrice } from "@/lib/site";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  category: string;
  image_url?: string | null;
  short_description?: string | null;
  in_stock?: boolean;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:ring-cyan-glow"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-surface to-background">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FlaskConical className="h-16 w-16 text-primary/40" />
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full border border-primary/40 bg-background/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary backdrop-blur">
          {product.category}
        </div>
        {product.in_stock === false && (
          <div className="absolute right-3 top-3 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-destructive-foreground">
            Out of stock
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-tight">{product.name}</h3>
        {product.short_description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {product.short_description}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground group-hover:text-primary">View →</span>
        </div>
      </div>
    </Link>
  );
}
