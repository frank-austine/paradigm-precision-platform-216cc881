import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatPrice, SITE } from "@/lib/site";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { ResearchNotice } from "@/components/ResearchNotice";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Paradigm Peptides LLC" }, { name: "description", content: "Review your research compounds before checkout." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotal, count } = useCart();
  const shipping = subtotal >= SITE.freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-primary/40" />
        <h1 className="font-display mt-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our research catalog to get started.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Cart ({count})</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-surface">
                {i.image_url && <img src={i.image_url} alt={i.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex flex-1 flex-col">
                <Link to="/product/$slug" params={{ slug: i.slug }} className="font-semibold hover:text-primary">{i.name}</Link>
                <div className="text-sm text-muted-foreground">{formatPrice(i.price)} each</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-border">
                    <button onClick={() => setQty(i.id, i.quantity - 1)} className="px-2 py-1"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm">{i.quantity}</span>
                    <button onClick={() => setQty(i.id, i.quantity + 1)} className="px-2 py-1"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-primary">{formatPrice(i.price * i.quantity)}</span>
                    <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            {subtotal < SITE.freeShippingThreshold && (
              <div className="text-xs text-primary">Add {formatPrice(SITE.freeShippingThreshold - subtotal)} more for free shipping</div>
            )}
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
          </div>
          <Link to="/checkout" className="mt-6 block rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary">Continue shopping</Link>
        </aside>
      </div>
      <div className="mt-12"><ResearchNotice /></div>
    </div>
  );
}
