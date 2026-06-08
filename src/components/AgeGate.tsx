import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RESEARCH_NOTICE } from "@/lib/site";

const KEY = "pp_age_gate_v1";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="ring-cyan-glow max-w-lg rounded-xl border bg-card p-8 text-card-foreground">
        <div className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary">
          Research Use Only
        </div>
        <h2 className="font-display text-2xl font-bold">Age & Research Disclaimer</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          I confirm I am 21 years of age or older and that any products purchased from{" "}
          <span className="text-foreground">Paradigm Peptides LLC</span> are for{" "}
          <strong className="text-foreground">laboratory and research purposes only</strong> — not
          for human or animal consumption.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{RESEARCH_NOTICE}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={accept} className="flex-1 font-semibold">
            I Confirm & Accept
          </Button>
          <a
            href="https://www.google.com"
            className="flex flex-1 items-center justify-center rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Leave Site
          </a>
        </div>
      </div>
    </div>
  );
}
