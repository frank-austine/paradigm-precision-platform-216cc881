import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Microscope } from "lucide-react";

export const Route = createFileRoute("/lab-results")({
  head: () => ({ meta: [{ title: "Lab Results & COAs — Paradigm Peptides LLC" }, { name: "description", content: "Third-party HPLC and mass spectrometry results for every batch we ship." }] }),
  component: Lab,
});

function Lab() {
  const sample = [
    { name: "BPC-157", batch: "BPC-2025-114", purity: "99.4%", date: "2025-09-22" },
    { name: "Retatrutide 20mg", batch: "RET-2025-088", purity: "98.7%", date: "2025-10-04" },
    { name: "Cardarine GW-501516", batch: "GW-2025-071", purity: "99.1%", date: "2025-08-30" },
    { name: "MK 677", batch: "MK-2025-099", purity: "99.6%", date: "2025-10-12" },
    { name: "TB500 Peptide", batch: "TB5-2025-061", purity: "98.9%", date: "2025-09-08" },
    { name: "Epitalon", batch: "EPI-2025-044", purity: "99.3%", date: "2025-09-19" },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Transparency</div>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Lab Results & COAs</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Every batch we stock is independently tested by accredited third-party laboratories. Below is a
        sample of recent certificates. Request the full COA for any product by emailing us with the batch number.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { i: Microscope, t: "HPLC verified" },
          { i: ShieldCheck, t: "Independent labs" },
          { i: FileText, t: "Public certificates" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-border bg-card p-5">
            <x.i className="h-5 w-5 text-primary" />
            <div className="mt-2 font-display font-semibold">{x.t}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Compound</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Purity</th>
              <th className="px-4 py-3">Tested</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sample.map((s) => (
              <tr key={s.batch} className="border-t border-border bg-card">
                <td className="px-4 py-3 font-semibold">{s.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.batch}</td>
                <td className="px-4 py-3 text-primary">{s.purity}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                <td className="px-4 py-3 text-right">
                  <a href="mailto:support@paradigmpeptides.com?subject=COA%20Request" className="text-primary hover:underline">Request COA →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
