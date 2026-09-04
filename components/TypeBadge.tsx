import { displayName } from "@/lib/format";
import { typeStyle } from "@/lib/typeColors";

export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase shadow-sm"
      style={typeStyle(type)}
    >
      {displayName(type)}
    </span>
  );
}
