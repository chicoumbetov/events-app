import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon?: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="p-6 border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        {/* Changed to text-foreground/90 for higher contrast ratio */}
        <p className="text-xs uppercase tracking-wider font-bold text-foreground/90">{title}</p>
        {Icon && (
          <Icon 
            className={`h-4 w-4 ${iconColor || 'text-brand-primary'}`} 
            aria-hidden="true" 
          />
        )}
      </div>
      <p className="text-3xl font-black tracking-tighter text-foreground">{value}</p>
    </Card>
  );
}
