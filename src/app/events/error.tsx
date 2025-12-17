'use client';

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
      <div className="bg-destructive/10 p-3 rounded-full text-destructive">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md">
        {error.message || "We encountered an error while loading the events. Please try again."}
      </p>
      <Button 
        onClick={() => reset()} 
        className="bg-[--color-brand-primary] hover:bg-[--color-brand-secondary] text-white gap-2"
      >
        <RefreshCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
