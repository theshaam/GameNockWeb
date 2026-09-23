"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PortfolioCarousel({ items }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        700: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
      }}
      loop
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      style={{ paddingBottom: 40 }}
    >
      {items.map((p) => (
        <SwiperSlide key={p.slug} style={{ height: "auto" }}>
          <Link
            href={`/work/${p.slug}/`}
            className="card glow-card"
            style={{ height: "100%", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}
          >
            {p.image && (
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--color-bg-alt)" }}>
                <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </div>
            )}
            <div style={{ padding: 24 }}>
              <h3>{p.name}</h3>
              <p style={{ marginTop: 8 }}>{p.solution}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
