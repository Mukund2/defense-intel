"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AiResponseProps {
  response: string;
  isLoading: boolean;
}

export function AiResponse({ response, isLoading }: AiResponseProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!response) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText("");

    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        setDisplayedText(response.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [response]);

  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary animate-pulse" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-3 w-3/4 rounded bg-primary/10 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-primary/10 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response) return null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="flex gap-3 py-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="size-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            AI Analysis
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary/60 animate-pulse align-text-bottom" />
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
