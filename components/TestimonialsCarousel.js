"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
          <div className="card" style={{ height: "100%" }}>
            <p style={{ fontSize: "1.02rem", color: "var(--color-ink)" }}>&ldquo;{t.quote}&rdquo;</p>
            <div style={{ marginTop: 18, fontWeight: 700 }}>{t.name}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
              {t.role}, {t.company}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
