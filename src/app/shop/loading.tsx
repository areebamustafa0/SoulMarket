export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-16 animate-pulse rounded bg-line" />
        <div className="h-10 w-64 animate-pulse rounded bg-line" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="hidden h-96 animate-pulse rounded-3xl bg-line/60 lg:block" />
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="aspect-square animate-pulse bg-line/60" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-16 animate-pulse rounded bg-line" />
                <div className="h-4 w-32 animate-pulse rounded bg-line" />
                <div className="h-5 w-20 animate-pulse rounded bg-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
