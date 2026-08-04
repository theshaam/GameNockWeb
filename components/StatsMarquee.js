import { SITE_CONFIG } from "@/data/config";

const ITEMS = [
  `${SITE_CONFIG.gamesShipped} Games Shipped`,
  `Est. ${SITE_CONFIG.founded}`,
  `${SITE_CONFIG.countriesServed} Countries Served`,
  "Unity & Unreal Experts",
  "Project or Dedicated Team — Your Call",
];

export default function StatsMarquee() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div className="stats-marquee">
      <div className="stats-marquee-track">
        {track.map((item, i) => (
          <span className="stats-marquee-item" key={i}>
            <span className="dot">●</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
