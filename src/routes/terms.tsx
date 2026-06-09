import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Paradigm Peptides LLC" }] }),
  component: () => (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Terms of Service</h1>

      <p className="mt-6 text-muted-foreground">
        This website is owned and operated by Paradigm Peptides LLC. Your use of this website constitutes your agreement to the terms and conditions outlined below:
      </p>

      <h2 className="font-display mt-8 text-xl font-bold">Intended Use of Products</h2>

      <p className="mt-2 text-muted-foreground"><strong>Research-Only Use:</strong> All chemicals and materials sold on this site are intended solely for laboratory and research purposes, unless otherwise explicitly stated. These products are not intended for human ingestion, inclusion in food, drugs, cosmetics, or medical devices, or for any commercial purposes.</p>

      <p className="mt-2 text-muted-foreground"><strong>Age Restriction:</strong> Purchasers must be at least 18 years old.</p>

      <p className="mt-2 text-muted-foreground"><strong>Qualified Handling:</strong> Products should only be handled by qualified, trained individuals.</p>

      <p className="mt-2 text-muted-foreground">Customers are responsible for understanding the health and safety hazards associated with handling and using these products, as well as complying with applicable government regulations.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Buyer Responsibilities and Warranties</h2>

      <p className="mt-2 text-muted-foreground"><strong>Testing and Compliance:</strong> Buyers must test and use products in accordance with all applicable state and federal laws, ensuring proper safety and compliance.</p>

      <p className="mt-2 text-muted-foreground"><strong>Hazard Awareness:</strong> Buyers are responsible for identifying potential risks and warning anyone who may come into contact with the products (e.g., customers, freight handlers).</p>

      <p className="mt-2 text-muted-foreground"><strong>Prohibition on Resale or Improper Use:</strong> Products are not intended for resale. Products must not be used recreationally or consumed by humans under any circumstances.</p>

      <p className="mt-2 text-muted-foreground"><strong>Federal Compliance:</strong> Buyers must ensure products meet the requirements of the Toxic Substances Control Act (TSCA) and are not adulterated or misbranded under the Federal Food, Drug, and Cosmetic Act.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Limitations of Liability</h2>

      <p className="mt-2 text-muted-foreground">Paradigm Peptides is not liable for any special, incidental, or consequential damages resulting from the handling or use of the products, whether due to negligence, strict liability, or other claims.</p>

      <p className="mt-2 text-muted-foreground">Purchasers agree to indemnify and hold Paradigm Peptides harmless from any claims, losses, or liabilities arising from the use of the products.</p>

      <h2 className="font-display mt-8 text-xl font-bold">General Provisions</h2>

      <p className="mt-2 text-muted-foreground">Products are sold with the understanding that they are intended exclusively for research purposes.</p>

      <p className="mt-2 text-muted-foreground">The inclusion of a product on the website does not constitute a recommendation for its use in any specific application.</p>

      <p className="mt-2 text-muted-foreground">By placing an order, buyers confirm they are qualified researchers and will handle products responsibly and legally.</p>
    </article>
  ),
});
