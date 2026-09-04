import { displayName } from "@/lib/format";

/**
 * Type colours live in globals.css as `--color-type-<name>` so a new type only
 * needs a CSS variable, not a code change. Unknown types fall back to normal.
 */
export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase shadow-sm"
      style={{
        backgroundColor: `var(--color-type-${type}, var(--color-type-normal))`,
      }}
    >
      {displayName(type)}
    </span>
  );
}
