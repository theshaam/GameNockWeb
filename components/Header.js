import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
import { SITE_CONFIG } from "@/data/config";

// Document 3, Section 2 — primary nav is now handled by NavBar (dropdowns
// on desktop, hamburger + slide-down on mobile per Document 8, Section 4).
export default function Header() {
  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/" className="brand">
          <Image src="/brand/gamenock-mark.png" alt="" width={32} height={28} priority />
          {SITE_CONFIG.siteName}
        </Link>
        <NavBar />
        <Link href="/start-a-project/" className="btn btn-primary btn-sm nav-desktop-cta">
          {SITE_CONFIG.primaryCta}
        </Link>
      </div>
    </header>
  );
}
