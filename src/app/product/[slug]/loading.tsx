export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 h-4 w-48 animate-pulse rounded bg-line" />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-[2rem] bg-line/60" />
        <div className="space-y-4">
          <div className="h-4 w-20 animate-pulse rounded bg-line" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-line" />
          <div className="h-6 w-32 animate-pulse rounded bg-line" />
          <div className="h-8 w-28 animate-pulse rounded bg-line" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-line/60" />
          <div className="h-12 w-full animate-pulse rounded-full bg-line/60" />
        </div>
      </div>
    </div>
  );
}
