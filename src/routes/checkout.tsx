import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { formatPrice, SITE } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreditCard, Smartphone, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Paradigm Peptides LLC" }, { name: "description", content: "Complete your research compound order." }] }),
  component: Checkout,
});

const schema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  customer_email: z.string().trim().email().max(255),
  customer_phone: z.string().trim().max(40).optional().or(z.literal("")),
  shipping_address: z.string().trim().min(5).max(300),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(60),
  zip: z.string().trim().min(3).max(20),
  country: z.string().trim().min(2).max(60),
  payment_method: z.enum(["card", "venmo", "cashapp"]),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string; method: string } | null>(null);
  const [method, setMethod] = useState<"card" | "venmo" | "cashapp">("card");

  const shipping = subtotal >= SITE.freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (done) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-display mt-4 text-3xl font-bold">Order received</h1>
        <p className="mt-2 text-muted-foreground">
          Order #{done.id.slice(0, 8).toUpperCase()} — Thank you. We'll email confirmation shortly.
        </p>
        {done.method !== "card" && (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6 text-left">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Payment instructions</div>
            <p className="mt-2 text-sm">
              Send <strong className="text-primary">{formatPrice(total)}</strong> via{" "}
              <strong>{done.method === "venmo" ? "Venmo" : "Cash App"}</strong> and include order #
              <strong>{done.id.slice(0, 8).toUpperCase()}</strong> in the note. We will contact you
              at the email provided once payment is confirmed.
            </p>
          </div>
        )}
        <button onClick={() => navigate({ to: "/" })} className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Back to home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <button onClick={() => navigate({ to: "/shop" })} className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Browse products</button>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse({ ...raw, payment_method: method });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({ ...parsed.data, subtotal, shipping, total })
        .select()
        .single();
      if (error) throw error;
      const orderItems = items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        product_name: i.name,
        unit_price: i.price,
        quantity: i.quantity,
        line_total: i.price * i.quantity,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;
      clear();
      setDone({ id: order.id, method });
    } catch (err) {
      console.error(err);
      toast.error("Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Checkout</h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <Section title="Contact">
            <Field name="customer_name" label="Full name" required />
            <Field name="customer_email" label="Email" type="email" required />
            <Field name="customer_phone" label="Phone (optional)" />
          </Section>

          <Section title="Shipping address">
            <Field name="shipping_address" label="Street address" required />
            <div className="grid gap-3 md:grid-cols-3">
              <Field name="city" label="City" required />
              <Field name="state" label="State / Region" required />
              <Field name="zip" label="ZIP" required />
            </div>
            <Field name="country" label="Country" defaultValue="United States" required />
          </Section>

          <Section title="Payment method">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { v: "card", label: "Card", icon: CreditCard },
                { v: "venmo", label: "Venmo", icon: Smartphone },
                { v: "cashapp", label: "Cash App", icon: Smartphone },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.v}
                  onClick={() => setMethod(opt.v as typeof method)}
                  className={`flex items-center gap-2 rounded-md border p-3 text-sm transition-colors ${method === opt.v ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"}`}
                >
                  <opt.icon className="h-4 w-4" /> {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {method === "card"
                ? "Card processing will be confirmed by email after order placement."
                : `After placing your order, you'll receive ${method === "venmo" ? "Venmo" : "Cash App"} payment instructions.`}
            </p>
          </Section>

          <Section title="Order notes (optional)">
            <textarea name="notes" rows={3} maxLength={1000} className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm" />
          </Section>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between">
                <span className="text-muted-foreground">{i.quantity}× {i.name}</span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
          </div>
          <button disabled={submitting} className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90 disabled:opacity-60">
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display mb-4 text-lg font-bold">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Field({ name, label, type = "text", required, defaultValue }: { name: string; label: string; type?: string; required?: boolean; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}{required && " *"}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}
