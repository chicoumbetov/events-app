import { Button } from "@/components/ui/button";

interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  showingCount: number;
  onPageChange: (page: number) => void;
}

export function EventsPagination({
  currentPage,
  totalPages,
  totalFiltered,
  showingCount,
  onPageChange,
}: EventsPaginationProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-sm text-muted-foreground">
        Showing {showingCount} of {totalFiltered} filtered results
      </p>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-muted-foreground mr-4">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
