
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  value: ReactNode;
  icon: ReactNode;
  trend?: number;
  className?: string;
  valueClassName?: string;
}

export function DashboardCard({
  title,
  description,
  value,
  icon,
  trend,
  className,
  valueClassName
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>
          {value}
        </div>
        {trend !== undefined && (
          <p className={cn(
            "text-xs mt-1", 
            trend > 0 ? "text-insurance-green" : trend < 0 ? "text-insurance-red" : "text-muted-foreground"
          )}>
            {trend > 0 ? "↑" : trend < 0 ? "↓" : ""}
            {Math.abs(trend)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
