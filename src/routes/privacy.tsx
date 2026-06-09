import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Paradigm Peptides LLC" }] }),
  component: () => (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-primary">Legal</div>
      <h1 className="font-display mt-2 text-4xl font-bold">Privacy Policy</h1>

      <h2 className="font-display mt-8 text-xl font-bold">Information Collection and Use</h2>
      <p className="mt-2 text-muted-foreground"><strong>Ownership of Data:</strong> Paradigm Peptides is the sole owner of all information collected through our site.</p>
      <p className="mt-2 text-muted-foreground"><strong>Voluntary Submission:</strong> We collect only the information you voluntarily provide via email or direct communication.</p>
      <p className="mt-2 text-muted-foreground"><strong>No Sale or Rental:</strong> We do not sell or rent your personal information to third parties.</p>
      <p className="mt-2 text-muted-foreground">We use your information to respond to inquiries and fulfill requests (e.g., processing and shipping orders). Information is shared with third parties only when necessary to complete your order.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Future Contact</h2>
      <p className="mt-2 text-muted-foreground">Unless you opt out, we may contact you via email with updates about specials, new products, services, or changes to our privacy policy.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Your Access and Control Over Information</h2>
      <p className="mt-2 text-muted-foreground">You can opt out of future communications at any time. To exercise your rights:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Contact us via the email or phone number provided on our website.</li>
        <li>Request to view, change, or delete your data.</li>
      </ul>

      <h2 className="font-display mt-8 text-xl font-bold">Security</h2>
      <p className="mt-2 text-muted-foreground"><strong>Protecting Your Information:</strong> We employ encryption to secure sensitive information (e.g., credit card details) during online transmission. Look for a closed lock icon or "https" in your browser to confirm secure pages.</p>
      <p className="mt-2 text-muted-foreground"><strong>Offline Protection:</strong> Only employees needing access for specific tasks (e.g., billing or customer service) can view personally identifiable information. Data is stored in a secure environment.</p>

      <h2 className="font-display mt-8 text-xl font-bold">Additional Information</h2>
      <p className="mt-2 text-muted-foreground">When you place an order, we request:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li><strong>Contact Information:</strong> Name, shipping address, etc.</li>
      </ul>
      <p className="mt-2 text-muted-foreground">This information is used for billing and order fulfillment. If we encounter issues processing your order, we will contact you using the information provided.</p>
      <p className="mt-2 text-muted-foreground">If you believe we are not adhering to this privacy policy, contact us immediately via phone or email.</p>
    </article>
  ),
});
