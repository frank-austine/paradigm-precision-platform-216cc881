import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Lock,
  Heart,
  Handshake,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Paradigm Peptides | Research-Grade Compounds Since 2014" },
      {
        name: "description",
        content:
          "Paradigm Peptides LLC has supplied researchers with pharmaceutical-grade Peptides, SARMs, Nootropics, and Lab Supplies since 2014. Still active. Still shipping.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto max-w-5xl px-4 py-20 md:py-28">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">About Us</div>
          <h1 className="font-display mt-3 text-4xl font-bold leading-tight md:text-6xl">
            Research-grade compounds. <span className="text-gradient-cyan">Delivered with integrity.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Paradigm Peptides LLC was established in 2014 with a clear mission: supply researchers with the
            best-quality compounds they need for their studies. A decade later, we're still doing exactly that
            actively shipping, fully operational, and committed to the same standards we started with.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* Active & shipping callout — directly addresses the "closed" narrative */}
        <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6 md:p-8 ring-cyan-glow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h2 className="font-display text-xl font-bold">Still here. Still shipping.</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paradigm Peptides LLC is active, operational, and under current ownership. Orders ship within
                  24 hours from our U.S. facility no exceptions, no hidden "release" fees, no third-party
                  payment middlemen.
                </p>
              </div>
            </div>
            <Button asChild className="md:flex-shrink-0">
              <Link to="/contact">Contact Us Directly</Link>
            </Button>
          </div>
        </div>

        {/* Brand story */}
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Our Story</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Built for researchers, by researchers.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground">
            <p>
              Over the past decade, Paradigm Peptides has built a reputation for delivering products that meet
              the highest standards of authenticity and purity. We collaborate exclusively with well-established
              U.S.-based direct manufacturers, which lets us offer a diverse range of compounds in both liquid
              and tablet forms without compromising on what's inside the vial.
            </p>
            <p>
              Our team shares a deep passion for the science behind Peptides, SARMs, and Nootropics. We're
              committed to ensuring every customer receives products that support their research with absolute
              confidence. Authenticity, purity, and effectiveness are at the heart of everything we do.
            </p>
          </div>
        </section>

        {/* Four pillars */}
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">What We Stand For</div>
          <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Four pillars. Zero compromises.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                t: "Unwavering quality assurance",
                d: "Every compound is pharmaceutical-grade and independently tested to verify authenticity and purity. Many exceed 98%; our most popular products reach over 99%.",
              },
              {
                icon: Lock,
                t: "Secure ordering",
                d: "Advanced SSL encryption and PCI-compliant storage protect your data. We accept Visa, Mastercard, American Express, and Discover processed directly, never through third parties.",
              },
              {
                icon: Heart,
                t: "Customer satisfaction",
                d: "Fast shipping within 24 hours, easy returns, and a dedicated support team ready to address any concern. We value every customer and build lasting partnerships with individuals and institutions alike.",
              },
              {
                icon: Handshake,
                t: "Trust & partnership",
                d: "Paradigm Peptides is more than a supplier we're your partner in research. We aim to empower the research community with the tools they need to succeed.",
              },
            ].map((p) => (
              <div key={p.t} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/40">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verifiable details */}
        <section className="mt-16 rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Verify Us</div>
          <h2 className="font-display mt-2 text-2xl font-bold md:text-3xl">Real company. Real address. Real people.</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            We list our information publicly because we want you to verify it. Paradigm Peptides LLC is a
            distinct entity we are <span className="text-foreground font-medium">not</span> affiliated with
            Paradigm R.E. LLC of Michigan City, Indiana, or any related party operating under a similar name.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Based in</div>
                <div className="mt-1 text-sm font-medium">Bourbonnais, Illinois — USA</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</div>
                <div className="mt-1 text-sm font-medium">support@paradigmpeptides.com</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Support hours</div>
                <div className="mt-1 text-sm font-medium">Available 24/7</div>
              </div>
            </div>
          </div>
        </section>


        {/* Lab results CTA */}
        <section className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-xl font-bold">Don't take our word for it.</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Every batch ships with a third-party Certificate of Analysis. Browse recent results, or request the COA for any specific lot.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="md:flex-shrink-0">
            <Link to="/lab-results">View Lab Results</Link>
          </Button>
        </section>

        {/* Closing CTAs */}
        <section className="mt-16 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to get back to research?</h2>
          <p className="mt-3 text-muted-foreground">Browse the catalog or reach out — we respond fast.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/shop">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
