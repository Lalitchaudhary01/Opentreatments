interface Props {
  name?: string | null;
  src?: string | null;
  size?: number;
}

export function AvatarWithFallback({
  name,
  src,
  size = 32,
}: Props) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return src ? (
    <img
      src={src}
      alt={name ?? "avatar"}
      style={{ width: size, height: size }}
      className="rounded-full object-cover"
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-muted flex items-center justify-center text-xs font-semibold"
    >
      {initials}
    </div>
  );
}
