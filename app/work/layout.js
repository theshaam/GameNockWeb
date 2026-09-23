import { withCanonical } from "@/lib/seo";

// app/work/page.js is a client component (it manages filter state), and
// client components can't export `metadata` directly in the App Router
// — this layout carries it instead.
export const metadata = withCanonical("/work/", {
  title: "GameNock Game Development Portfolio and Case Studies",
  description: "Work That Shows What GameNock Took Responsibility For — complete games, co-development contributions, multiplayer systems, connected platforms and technical expansions.",
});

export default function WorkLayout({ children }) {
  return children;
}
