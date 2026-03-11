"use client";

import { SearchBar } from "@/components/dashboard/search-bar";
import { AiResponse } from "@/components/dashboard/ai-response";
import { ProactiveRecs } from "@/components/dashboard/proactive-recs";
import { ContractCard } from "@/components/dashboard/contract-card";
import { useSearch } from "@/hooks/use-search";

export default function DashboardPage() {
  const {
    query,
    setQuery,
    isSearching,
    hasSearched,
    results,
    aiResponse,
    search,
    clear,
  } = useSearch();

  const isActive = hasSearched || query.length > 0;

  return (
    <div className="min-h-[calc(100vh-3rem)]">
      {/* ── Idle state: centered search ── */}
      {!isActive && (
        <div className="flex flex-col items-center justify-center gap-10 pt-[12vh]">
          {/* Proactive recommendations */}
          <ProactiveRecs />

          {/* Centered search bar */}
          <div className="flex flex-col items-center gap-3">
            <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground">
              What are you looking for?
            </h1>
            <p className="text-sm text-muted-foreground">
              Search contracts, agencies, capabilities — AI will find your best matches
            </p>
          </div>

          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => search()}
            onClear={clear}
            isActive={false}
            isSearching={isSearching}
          />
        </div>
      )}

      {/* ── Active state: search at top + results ── */}
      {isActive && (
        <div className="mx-auto max-w-4xl space-y-5">
          {/* Search bar at top */}
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => search()}
            onClear={clear}
            isActive={true}
            isSearching={isSearching}
          />

          {/* AI Response */}
          <AiResponse response={aiResponse} isLoading={isSearching} />

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Matched Contracts
                </h2>
                <span className="font-mono text-xs text-muted-foreground">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
              </div>

              {results.map((opp) => (
                <ContractCard key={opp.id} opp={opp} />
              ))}
            </div>
          )}

          {/* No results */}
          {hasSearched && !isSearching && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-muted-foreground">
                No contracts found matching your search.
              </p>
              <button
                onClick={clear}
                className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
