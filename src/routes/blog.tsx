import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "@/lib/db";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Research Blog — Paradigm Peptides LLC" }, { name: "description", content: "Research notes, compound deep-dives, and lab guides." }] }),
  component: Blog,
});

function Blog() {
  const { data: posts = [], isLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchBlogPosts });

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Research</div>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Research Blog</h1>
      <p className="mt-3 text-muted-foreground">Compound deep-dives, lab guides, and research notes.</p>

      {isLoading ? (
        <div className="mt-12 text-muted-foreground">Loading…</div>
      ) : posts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-border bg-card p-12 text-center">
          <FlaskConical className="mx-auto h-10 w-10 text-primary/50" />
          <h3 className="font-display mt-4 text-xl font-bold">Articles coming soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">Our research team is preparing the first set of deep-dives.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</div>
              <h2 className="font-display mt-1 text-xl font-bold group-hover:text-primary">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
