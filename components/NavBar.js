"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Icon from "./Icon";
import { OFFERS } from "@/data/offers";
import { EXPERTISE } from "@/data/expertise";

// Blueprint Section 3 (Global header and navigation) — What We Do / How
// We Work / Our Work / Expertise / Insights / Company. Desktop dropdowns
// are CSS-only (:hover/:focus-within); mobile uses a real hamburger
// toggle with React state, per Document 8's mobile-menu requirement.

const MENUS = [
  {
    label: "What We Do",
    href: "/what-we-do/",
    items: [{ href: "/what-we-do/", label: "Overview" }, ...OFFERS.map((o) => ({ href: `/what-we-do/${o.slug}/`, label: o.navLabel }))],
  },
  {
    label: "Expertise",
    href: "/expertise/unity-game-development/",
    items: EXPERTISE.map((e) => ({ href: `/expertise/${e.slug}/`, label: e.name })),
  },
  {
    label: "Company",
    href: "/company/about/",
    items: [
      { href: "/company/about/", label: "About" },
      { href: "/company/technology/", label: "Technology" },
      { href: "/company/careers/", label: "Careers" },
      { href: "/contact/", label: "Contact" },
    ],
  },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);

  // The mobile menu is portaled to document.body — rendering it inline
  // inside .site-header's flex row made position:fixed + top/bottom
  // collapse to content height in Chromium (a real fixed-flex-item
  // sizing quirk), so the overlay never actually covered the screen.
  useEffect(() => setMounted(true), []);

  // Lock background scroll while the menu is open (Document 8, Section
  // 4's mobile-menu requirement) and restore it on close/unmount.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  // Return keyboard focus to the menu trigger when the menu closes.
  useEffect(() => {
    if (mobileOpen) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [mobileOpen]);

  const mobileMenu = mobileOpen && (
    <div className="mobile-menu">
      {MENUS.map((m) => (
        <div key={m.label} className="mobile-menu-group">
          <div className="mobile-menu-heading">{m.label}</div>
          {m.items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>
          ))}
        </div>
      ))}
      <Link href="/how-we-work/" onClick={() => setMobileOpen(false)}>How We Work</Link>
      <Link href="/work/" onClick={() => setMobileOpen(false)}>Our Work</Link>
      <Link href="/insights/" onClick={() => setMobileOpen(false)}>Insights</Link>
      <Link href="/start-a-project/" className="btn btn-primary btn-block" onClick={() => setMobileOpen(false)}>Discuss Your Project</Link>
    </div>
  );

  return (
    <>
      <nav className="nav-links nav-desktop">
        {MENUS.map((m) => (
          <div key={m.label} className="nav-dropdown">
            <Link href={m.href}>{m.label} <Icon name="ChevronDown" size={14} /></Link>
            <div className="nav-dropdown-menu">
              {m.items.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <Link href="/how-we-work/">How We Work</Link>
        <Link href="/work/">Our Work</Link>
        <Link href="/insights/">Insights</Link>
      </nav>

      <button
        ref={triggerRef}
        className="hamburger-btn"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
      </button>

      {mounted && mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
