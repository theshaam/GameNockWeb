"use client";

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
          <Link href={`/portfolio/${p.slug}`} className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <h3>{p.name}</h3>
            <p style={{ marginTop: 8 }}>{p.solution}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
