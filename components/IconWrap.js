import Icon from "./Icon";

// Document 8, Section 5: "one icon per card/section maximum, always
// inside a consistent icon-wrap container (rounded square, tinted
// background using the section's accent color)."
export default function IconWrap({ name, accent = "primary", size = 22 }) {
  return (
    <div className={`icon-wrap icon-wrap-${accent}`}>
      <Icon name={name} size={size} />
    </div>
  );
}
