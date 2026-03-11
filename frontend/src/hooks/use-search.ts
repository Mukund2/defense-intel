"use client";

import { useState, useCallback, useRef } from "react";
import { mockSearch, type SearchResult } from "@/lib/mock-search";
import type { Opportunity } from "@/lib/mock-data";

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  isSearching: boolean;
  hasSearched: boolean;
  results: Opportunity[];
  aiResponse: string;
  search: (q?: string) => void;
  clear: () => void;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Opportunity[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(
    (q?: string) => {
      const searchQuery = q ?? query;
      if (!searchQuery.trim()) return;

      setIsSearching(true);
      setHasSearched(true);
      setAiResponse("");
      setResults([]);

      // Simulate network delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const result: SearchResult = mockSearch(searchQuery);
        setResults(result.opportunities);
        setAiResponse(result.aiResponse);
        setIsSearching(false);
      }, 600);
    },
    [query]
  );

  const clear = useCallback(() => {
    setQuery("");
    setIsSearching(false);
    setHasSearched(false);
    setResults([]);
    setAiResponse("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { query, setQuery, isSearching, hasSearched, results, aiResponse, search, clear };
}
