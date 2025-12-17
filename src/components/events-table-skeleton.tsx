import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function EventsTableSkeleton() {
  return (
    <div className="rounded-md border animate-pulse">
      <Table>
        <TableHeader>
          <TableRow>
            {['Type', 'Location', 'Date', 'Status', 'Capacity', ''].map((h, i) => (
              <TableHead key={i}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(6)].map((_, j) => (
                <TableCell key={j}>
                  <div className="h-4 bg-muted rounded w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
