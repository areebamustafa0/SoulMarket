import { StarIcon } from "@/components/icons";

export function StarRating({
  rating,
  count,
  size = 14,
  showValue = true,
}: {
  rating: number;
  count?: number;
  size?: number;
  showValue?: boolean;
}) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5 text-accent">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            filled={i < rounded}
            width={size}
            height={size}
            className={i < rounded ? "text-accent" : "text-line"}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-muted">
          {rating.toFixed(1)}
          {typeof count === "number" && ` (${count})`}
        </span>
      )}
    </div>
  );
}
