
import { useState } from "react";
import {
  ArrowRight,
  FileText,
  Shield,
  ClipboardList,
  DollarSign,
  Users,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatusBadge } from "@/components/insurance/StatusBadge";
import { mockClaimRequests, mockPolicies } from "@/data/mockData";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  const pendingClaims = mockClaimRequests.filter(claim => claim.status === "pending").length;
  const activePolicies = mockPolicies.filter(policy => policy.isActive).length;
  
  // Calculate total premium value
  const totalPremium = mockPolicies.reduce((sum, policy) => sum + policy.premium, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Policies"
          value={activePolicies}
          icon={<Shield className="h-5 w-5" />}
          trend={8.2}
        />
        <DashboardCard
          title="Pending Claims"
          value={pendingClaims}
          icon={<ClipboardList className="h-5 w-5" />}
          trend={-3.1}
        />
        <DashboardCard
          title="Premium Value"
          value={`₹${totalPremium.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          trend={12.5}
        />
        <DashboardCard
          title="Customer Satisfaction"
          value="92%"
          icon={<Users className="h-5 w-5" />}
          trend={4.7}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Premium Distribution</h3>
              <Button variant="ghost" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                View Report
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">
                Premium distribution chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Claims</h3>
              <NavLink to="/claims">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </NavLink>
            </div>
            <div className="space-y-4">
              {mockClaimRequests.slice(0, 3).map((claim) => (
                <div key={claim.id} className="flex items-start gap-3 pb-3 border-b">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{claim.userDetails.name}</p>
                      <StatusBadge status={claim.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {claim.policyDetails.policyName}
                    </p>
                    <p className="text-xs font-medium">
                      Amount: ₹{claim.claimAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
