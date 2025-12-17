import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="h-10 w-64 bg-muted animate-pulse rounded" />
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}
