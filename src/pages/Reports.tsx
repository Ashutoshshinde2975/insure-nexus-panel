
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Current Date: {currentDate}
        </p>
      </div>
      
      <Tabs defaultValue="policy">
        <TabsList>
          <TabsTrigger value="policy">Policy Reports</TabsTrigger>
          <TabsTrigger value="claim">Claim Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="policy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Active Policies Report"
                description="Summary of all active policies with details"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Today"
              />
              
              <ReportCard
                title="Policy Expiry Report"
                description="Policies expiring in the next 30 days"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Yesterday"
              />
              
              <ReportCard
                title="Policy Category Distribution"
                description="Distribution of policies by category"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="3 days ago"
              />
              
              <ReportCard
                title="New Policies Report"
                description="Policies created in the last 30 days"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="1 week ago"
              />
              
              <ReportCard
                title="Premium Collection Report"
                description="Premium collection details by policy type"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="2 weeks ago"
              />
              
              <ReportCard
                title="Expired Policies Report"
                description="Summary of expired policies"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="1 month ago"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="claim">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Claims Summary Report"
                description="Summary of all claims with status"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Today"
              />
              
              <ReportCard
                title="Pending Claims Report"
                description="List of all pending claims waiting for approval"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Today"
              />
              
              <ReportCard
                title="Claim Settlement Report"
                description="Details of settled claims and amounts"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Yesterday"
              />
              
              <ReportCard
                title="Claim Rejection Report"
                description="Details of rejected claims and reasons"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="3 days ago"
              />
              
              <ReportCard
                title="Claim Processing Time Report"
                description="Average time taken to process claims"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="1 week ago"
              />
              
              <ReportCard
                title="Claims by Policy Type"
                description="Distribution of claims by policy type"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="2 weeks ago"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="financial">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Revenue Report"
                description="Summary of all revenue from premiums"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Today"
              />
              
              <ReportCard
                title="Claims Payout Report"
                description="Summary of all claim payouts"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="Today"
              />
              
              <ReportCard
                title="Profit & Loss Statement"
                description="Monthly P&L statement"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="1 day ago"
              />
              
              <ReportCard
                title="Premium vs Claims Report"
                description="Comparison of premium collection vs claim payouts"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="3 days ago"
              />
              
              <ReportCard
                title="Tax Report"
                description="Summary of taxes applicable on insurance"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="1 week ago"
              />
              
              <ReportCard
                title="Commission Report"
                description="Summary of commissions paid to agents"
                icon={<FileText className="h-5 w-5" />}
                lastGenerated="2 weeks ago"
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated: string;
}

const ReportCard = ({ title, description, icon, lastGenerated }: ReportCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Last Generated: {lastGenerated}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1 text-xs">
              <Download className="h-3 w-3 mr-1" /> PDF
            </Button>
            <Button variant="outline" className="flex-1 text-xs">
              <Download className="h-3 w-3 mr-1" /> Excel
            </Button>
            <Button variant="outline" className="flex-1 text-xs">
              <Download className="h-3 w-3 mr-1" /> CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;
