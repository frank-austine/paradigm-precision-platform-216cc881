import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Clock, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Paradigm Peptides LLC" }, { name: "description", content: "Get in touch with our research support team — available 24/7." }] }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check your input");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSubmitting(false);
    if (error) { toast.error("Couldn't send. Try again."); return; }
    setSent(true);
    toast.success("Message sent");
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Contact</div>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Get in touch</h1>
      <p className="mt-3 text-muted-foreground">Research support available 24/7. We typically reply within a few hours.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-border bg-card p-6">
          {sent ? (
            <div className="py-10 text-center">
              <MessageCircle className="mx-auto h-10 w-10 text-primary" />
              <h2 className="font-display mt-3 text-xl font-bold">Message sent</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll reply to the email you provided.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Name *</span>
                  <input name="name" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Email *</span>
                  <input name="email" type="email" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Subject</span>
                <input name="subject" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Message *</span>
                <textarea name="message" rows={6} required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </label>
              <button disabled={submitting} className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground ring-cyan-glow hover:opacity-90 disabled:opacity-60">
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <Mail className="h-5 w-5 text-primary" />
            <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</div>
            <a href={`mailto:${SITE.contactEmail}`} className="mt-1 block text-sm hover:text-primary">{SITE.contactEmail}</a>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Clock className="h-5 w-5 text-primary" />
            <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Hours</div>
            <div className="mt-1 text-sm">{SITE.contactHours}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
