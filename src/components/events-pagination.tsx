import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex items-center justify-between py-2" aria-label="Pagination Control">
      <p className="text-sm text-muted-foreground">
        Showing <strong>{showingCount}</strong> of <strong>{totalFiltered}</strong> results
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
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
