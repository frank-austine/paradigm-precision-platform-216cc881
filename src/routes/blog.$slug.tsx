import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPost } from "@/lib/db";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — Paradigm Peptides Blog` }] }),
  component: Post,
});

function Post() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({ queryKey: ["post", slug], queryFn: () => fetchBlogPost(slug) });
  if (isLoading) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading…</div>;
  if (!post) throw notFound();
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <Link to="/blog" className="text-xs text-primary hover:underline">← Back to blog</Link>
      <div className="mt-6 text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</div>
      <h1 className="font-display mt-2 text-4xl font-bold">{post.title}</h1>
      {post.excerpt && <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>}
      {post.cover_image && <img src={post.cover_image} alt={post.title} className="mt-8 w-full rounded-xl" />}
      <div className="prose prose-invert mt-8 max-w-none text-muted-foreground">
        {post.content.split("\n\n").map((p, i) => <p key={i} className="mb-4 leading-relaxed">{p}</p>)}
      </div>
    </article>
  );
}
