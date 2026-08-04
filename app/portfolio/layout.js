import { withCanonical } from "@/lib/seo";

// app/portfolio/page.js is a client component (it manages the category
// filter's interactive state), and client components can't export
// `metadata` directly in the App Router — this layout carries it instead.
export const metadata = withCanonical("/portfolio", {
  title: "Portfolio",
  description: "100+ shipped titles across casual, multiplayer, blockchain, interactive, and more.",
});

export default function PortfolioLayout({ children }) {
  return children;
}
