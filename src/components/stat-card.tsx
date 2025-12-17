import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <dl>
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <dt>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </dt>
        </CardHeader>
        <CardContent>
          <dd className="text-2xl text-center font-bold">{value}</dd>
        </CardContent>
      </dl>
    </Card>
  );
}
