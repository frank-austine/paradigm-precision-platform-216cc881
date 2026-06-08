import { AlertTriangle } from "lucide-react";
import { RESEARCH_NOTICE } from "@/lib/site";

export function ResearchNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm ${className}`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <p className="font-mono text-xs uppercase tracking-wide text-primary">{RESEARCH_NOTICE}</p>
    </div>
  );
}
