import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Timeleft Events Management
        </h1>
        <p className="text-xl text-muted-foreground">
          A technical test implementation featuring Server-Side rendering, 
          URL-synchronized filtering, sorting, and pagination.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/events">View Events Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
