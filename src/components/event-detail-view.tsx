import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface EventDetailViewProps {
  id: string;
}

export function EventDetailView({ id }: EventDetailViewProps) {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
        <Link href="/events" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
        <p className="text-muted-foreground text-lg">ID: {id}</p>
      </div>

      <div className="rounded-lg border border-dashed p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-muted rounded-full p-4 mb-4">
          <span className="text-2xl">📅</span>
        </div>
        <h2 className="text-xl font-semibold">Event Content Placeholder</h2>
        <p className="text-muted-foreground max-w-sm mt-2">
          This page represents the navigation mechanism requested in the MVP. 
          Full details for event <strong>{id}</strong> would be fetched and rendered here.
        </p>
      </div>
    </div>
  );
}
