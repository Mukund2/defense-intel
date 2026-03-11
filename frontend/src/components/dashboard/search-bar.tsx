"use client";

import { Search, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  onClear: () => void;
  isActive: boolean;
  isSearching: boolean;
}

const QUICK_SEARCHES = [
  "Counter-UAS opportunities",
  "ISR data processing",
  "SOCOM contracts",
  "Cyber & EW",
  "SBIR set-asides",
];

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
  onClear,
  isActive,
  isSearching,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "w-full transition-all duration-500 ease-out",
        isActive ? "max-w-3xl" : "max-w-2xl"
      )}
    >
      {/* Search input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <Sparkles className="size-5 text-primary" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Ask about opportunities, contracts, competitors..."
          className={cn(
            "w-full rounded-xl border border-border/60 bg-card px-12 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all",
            "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
            isActive ? "h-12" : "h-14 text-base"
          )}
          autoFocus={!isActive}
        />
        {query && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
        {!query && (
          <button
            onClick={onSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Search className="size-3.5" />
          </button>
        )}
      </div>

      {/* Quick search pills */}
      {!isActive && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {QUICK_SEARCHES.map((pill) => (
            <button
              key={pill}
              onClick={() => {
                onQueryChange(pill);
                // trigger search after setting query
                setTimeout(() => onSearch(), 0);
              }}
              className="rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {pill}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
