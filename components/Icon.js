// Thin wrapper around lucide-react so pages can reference icons by
// string name (as stored in data/services.js) without importing every
// icon individually everywhere.
import * as Icons from "lucide-react";

export default function Icon({ name, size = 20, className = "", ...props }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp size={size} className={className} {...props} />;
}
