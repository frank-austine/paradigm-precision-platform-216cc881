import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
const pplogo = { url: "/__l5e/assets-v1/33bbc803-209f-4a98-8415-97eb3b253e32/pplogo.png" };

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/shop", label: "Shop" },
    ...SITE.categories.map((c) => ({ to: `/category/${c.slug}`, label: c.label })),
    { to: "/lab-results", label: "Lab Results" },
    { to: "/blog", label: "Research" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="border-b border-border/40 bg-primary py-2 text-center text-xs font-mono uppercase tracking-widest text-primary-foreground">
        Free Shipping on Orders Over ${SITE.freeShippingThreshold} · All Products For Research Use Only
      </div>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center">
          <img src={pplogo.url} alt="Paradigm Peptides" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium hover:border-primary/60"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
