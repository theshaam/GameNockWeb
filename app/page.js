import Link from "next/link";
import { SITE_CONFIG } from "@/data/config";

const expertiseCards = [
  {
    title: "Unity",
    body: "Game development, prototyping and production expertise.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Multiplayer",
    body: "Online systems, co-op experiences, and social features.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Backend",
    body: "Player services, live operations and scalable infrastructure.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mobile",
    body: "Optimized experiences for iOS and Android.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "WebGL",
    body: "High-quality browser games that reach new players.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Porting & Optimization",
    body: "Engine upgrades, performance optimization and multi-platform support.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
];

const processSteps = [
  { label: "01", title: "Discover", body: "Align on vision, opportunities and requirements." },
  { label: "02", title: "Plan", body: "Define scope, team structure and roadmap." },
  { label: "03", title: "Build", body: "Design, iterate and integrate production-ready features." },
  { label: "04", title: "Validate", body: "Test, refine and ensure compatibility across platforms." },
  { label: "05", title: "Launch & Grow", body: "Release with confidence and support what comes next." },
];

const technologies = ["Unity", "aws", "PlayFab", "UNREAL", "iOS / Android", "Consoles"];

const insights = [
  {
    category: "PROCESS",
    title: "A Practical Guide to Multiplayer Architecture",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "TECHNICAL",
    title: "Optimizing Your Game for Multiple Platforms",
    time: "7 min read",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "STRATEGY",
    title: "From Launch to Live Operations",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="gamenock-landing">
      <header className="topbar-wrap">
        <div className="container topbar">
          <div className="brand-block" aria-label="GameNock home">
            <span className="brand-mark">G</span>
            <span className="brand-text">GameNock</span>
          </div>

          <nav className="nav" aria-label="Main navigation">
            <Link href="#">What We Do</Link>
            <Link href="#">How We Work</Link>
            <Link href="#">Our Work</Link>
            <Link href="#">Expertise</Link>
            <Link href="#">Insights</Link>
            <Link href="#">Company</Link>
          </nav>

          <Link href="#" className="header-cta">
            Discuss Your Project
          </Link>
        </div>
      </header>

      <main>
        <section className="hero-shell">
          <div className="container hero-inner">
            <div className="hero-text">
              <div className="eyebrow-label">GLOBAL GAME DEVELOPMENT PARTNER</div>
              <h1>
                Build Your Game.
                <span>Scale Your Team.</span>
                Reach More Platforms.
              </h1>
              <p>
                Complete development, co-development and specialist engineering for ambitious game projects.
              </p>
              <div className="hero-actions">
                <Link href="#" className="primary-btn">
                  Discuss Your Project
                </Link>
                <Link href="#" className="secondary-btn">
                  Explore Our Work
                </Link>
              </div>

              <div className="hero-badges">
                <div className="mini-badge">
                  <span className="icon-circle">●</span>
                  <span>50+ Games Developed</span>
                </div>
                <div className="mini-badge">
                  <span className="icon-circle">●</span>
                  <span>Mobile · PC · WebGL</span>
                </div>
                <div className="mini-badge">
                  <span className="icon-circle">●</span>
                  <span>Multiplayer & Backend</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="providers-strip">
          <div className="container providers-row">
            <div className="service-flag">Strategic thinking, not just execution</div>
            <div className="service-flag">Flexible engagement models</div>
            <div className="service-flag">Experienced multidisciplinary teams</div>
            <div className="service-flag">A long-term partner in your success</div>
          </div>
        </section>

        <section className="section spacing-lg">
          <div className="container">
            <div className="section-heading center-heading">
              <div className="eyebrow-label alt">OUR APPROACH</div>
              <h2>A Development Partner for Every Serious Stage.</h2>
              <p>
                From first concept to live operations, we integrate with your team, bring clarity to the roadmap,
                and help you deliver polished, scalable game experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="section spacing-md">
          <div className="container">
            <div className="feature-grid">
              {expertiseCards.map((card) => (
                <article key={card.title} className="feature-card">
                  <div
                    className="feature-art"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(4,15,30,0.08), rgba(4,15,30,0.7)), url('${card.image}')`,
                    }}
                  />
                  <div className="feature-content">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <span className="arrow-pill">→</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section spacing-lg process-section">
          <div className="container">
            <div className="section-heading center-heading narrow-heading">
              <div className="eyebrow-label alt">OUR PROCESS</div>
              <h2>From Concept to a World Players Love.</h2>
              <p>
                A clear, collaborative process that keeps your project on track from day one to long-term success.
              </p>
            </div>

            <div className="process-timeline">
              {processSteps.map((step) => (
                <div key={step.label} className="process-step">
                  <span className="step-number">{step.label}</span>
                  <div className="step-dot" />
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section spacing-lg tech-strip-wrap">
          <div className="container">
            <div className="tech-strip">
              {technologies.map((item) => (
                <span key={item} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section spacing-lg">
          <div className="container client-proof">
            <div className="client-copy">
              <div className="eyebrow-label alt">CLIENT PERSPECTIVE</div>
              <div className="stat-row">
                <div className="metric">
                  <strong>95%</strong>
                  <span>Work with</span>
                  <small>GameNock again</small>
                </div>
                <div className="metric">
                  <strong>4.8/5</strong>
                  <span>Average</span>
                  <small>satisfaction</small>
                </div>
              </div>
            </div>

            <div className="testimonial-block">
              <blockquote>“GameNock felt like a true extension of our team.”</blockquote>
              <p>
                They brought expertise, creativity and real ownership to the project. The quality, communication and
                speed were outstanding.
              </p>
              <div className="person">
                <div className="avatar" aria-label="Sarah Chen" />
                <div>
                  <strong>Sarah Chen</strong>
                  <span>Studio Director, Indie Studio</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section spacing-lg">
          <div className="container">
            <div className="insight-header">
              <div>
                <div className="eyebrow-label alt">INSIGHTS</div>
                <h2>Latest Guides and Perspectives.</h2>
              </div>
              <Link href="#" className="inline-link">
                View All Insights →
              </Link>
            </div>

            <div className="insight-grid">
              {insights.map((item) => (
                <article key={item.title} className="insight-card">
                  <div
                    className="insight-art"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(4,15,30,0.12), rgba(4,15,30,0.68)), url('${item.image}')`,
                    }}
                  />
                  <div className="insight-body">
                    <span className="small-label">{item.category}</span>
                    <h3>{item.title}</h3>
                    <div className="meta-row">
                      <span className="tiny-arrow">→</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-row">
            <div className="cta-copy">
              <h2>Let&apos;s Build What&apos;s Next.</h2>
              <p>A long-term partner for bold ideas, ambitious teams and unforgettable games.</p>
            </div>
            <Link href="#" className="primary-btn small-btn">
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand-block" aria-label="GameNock footer brand">
              <span className="brand-mark">G</span>
              <span className="brand-text">GameNock</span>
            </div>
            <p>Building the next generation of game experiences.</p>
            <div className="social-links">
              <span>in</span>
              <span>x</span>
              <span>◌</span>
            </div>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              <li>Co-Development</li>
              <li>Specialized Development</li>
              <li>Game Ops & Support</li>
            </ul>
          </div>

          <div>
            <h4>Our Process</h4>
            <ul>
              <li>Discovery</li>
              <li>Planning</li>
              <li>Build</li>
              <li>Launch & Grow</li>
            </ul>
          </div>

          <div>
            <h4>Expertise</h4>
            <ul>
              <li>Multiplayer</li>
              <li>Backend</li>
              <li>Mobile</li>
              <li>WebGL</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>Articles</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2024 GameNock. All rights reserved.</span>
          <span>{SITE_CONFIG.email}</span>
        </div>
      </footer>
    </div>
  );
}
