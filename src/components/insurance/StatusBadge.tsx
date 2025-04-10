
import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "active" | "expired";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let badgeStyle = "";
  
  switch (status) {
    case "pending":
      badgeStyle = "bg-insurance-yellow text-black";
      break;
    case "approved":
    case "active":
      badgeStyle = "bg-insurance-green text-white";
      break;
    case "rejected":
    case "expired":
      badgeStyle = "bg-insurance-red text-white";
      break;
    default:
      badgeStyle = "bg-gray-200 text-gray-800";
  }
  
  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-semibold inline-block",
      badgeStyle,
      className
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
