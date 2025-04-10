
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart, 
  FileText, 
  Home, 
  Users, 
  Shield, 
  ClipboardList, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center py-3 px-4 rounded-md transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "text-sidebar-foreground",
          collapsed ? "justify-center" : ""
        )
      }
    >
      <Icon size={20} className={collapsed ? "" : "mr-3"} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl">
            InsureNexus
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <NavItem to="/" icon={Home} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/profile" icon={Users} label="Company Profile" collapsed={collapsed} />
        <NavItem to="/policies" icon={Shield} label="Policy Management" collapsed={collapsed} />
        <NavItem to="/claims" icon={ClipboardList} label="Claim Processing" collapsed={collapsed} />
        <NavItem to="/reports" icon={BarChart} label="Reports" collapsed={collapsed} />
        <NavItem to="/documents" icon={FileText} label="Documents" collapsed={collapsed} />
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <NavItem to="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
      </div>
    </div>
  );
}
