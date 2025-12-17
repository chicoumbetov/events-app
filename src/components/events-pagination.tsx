import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  showingCount: number;
  onPageChange: (page: number) => void;
}

export function EventsPagination({ currentPage, totalPages, totalFiltered, showingCount, onPageChange }: EventsPaginationProps) {
  return (
    <nav 
      className="flex items-center justify-between py-2 border-t mt-4" 
      aria-label="Pagination Navigation"
    >
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{showingCount}</span> of <span className="font-semibold text-foreground">{totalFiltered}</span> results
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="hover:border-brand-primary hover:text-brand-primary"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="hover:border-brand-primary hover:text-brand-primary"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
