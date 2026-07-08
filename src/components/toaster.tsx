"use client";

import { useUI } from "@/components/ui-context";
import { CheckIcon, SparkleIcon } from "@/components/icons";

export function Toaster() {
  const { toasts, dismiss } = useUI();

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className="animate-pop pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-4 text-left shadow-card"
        >
          {t.image ? (
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-background">
              <img src={t.image} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                t.variant === "info"
                  ? "bg-primary/10 text-primary"
                  : "bg-success/12 text-success"
              }`}
            >
              {t.variant === "info" ? (
                <SparkleIcon width={20} height={20} />
              ) : (
                <CheckIcon width={20} height={20} />
              )}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">{t.title}</p>
            {t.description && (
              <p className="line-clamp-1 text-xs text-muted">{t.description}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
