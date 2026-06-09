import { Link } from "@tanstack/react-router";
import { SITE, RESEARCH_NOTICE } from "@/lib/site";
import pplogo from "@/assets/pplogo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={pplogo.url} alt="Paradigm Peptides" className="h-12 w-auto" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-muted-foreground">{RESEARCH_NOTICE}</p>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Shop</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            {SITE.categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/lab-results" className="hover:text-primary">Lab Results</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Research Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shipping-returns" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Paradigm Peptides LLC. All rights reserved.</div>
          <div>{SITE.contactEmail} · {SITE.contactHours}</div>
        </div>
      </div>
    </footer>
  );
}
