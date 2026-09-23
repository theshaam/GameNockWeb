"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export default function TestimonialsCarousel({ testimonials }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{ 800: { slidesPerView: 2 } }}
      loop
      autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      style={{ paddingBottom: 40 }}
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i} style={{ height: "auto" }}>
          <div className="card glow-card" style={{ height: "100%" }}>
            <p style={{ fontSize: "1.02rem", color: "var(--color-ink)" }}>&ldquo;{t.quote}&rdquo;</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: "radial-gradient(circle at 35% 30%, var(--color-secondary), var(--color-primary))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.85rem", color: "#111117",
                }}
              >
                {initials(t.name)}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
