
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Building, 
  FileText, 
  Briefcase, 
  ClipboardList, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users,
  Search,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/insurance/StatusBadge";
import { adminApi, companyApi, claimApi, policyApi } from "@/services/api";
import { InsuranceType, CompanyProfile, ClaimRequest, Policy } from "@/types/insurance";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Admin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // For now, use mock data
        // In production, use these API calls:
        // const statsRes = await adminApi.getStats();
        // setStats(statsRes.data);
        
        // const companiesRes = await companyApi.getAll();
        // setCompanies(companiesRes.data);
        
        // const claimsRes = await claimApi.getAll();
        // setClaims(claimsRes.data);
        
        // const policiesRes = await policyApi.getAll();
        // setPolicies(policiesRes.data);
        
        // Using mock data for now
        import('@/data/mockData').then(({ 
          mockCompanyProfile, 
          mockClaimRequests, 
          mockPolicies 
        }) => {
          setCompanies([mockCompanyProfile]);
          setClaims(mockClaimRequests);
          setPolicies(mockPolicies);
          
          // Mock stats
          setStats({
            totalCompanies: 1,
            totalPolicies: mockPolicies.length,
            totalClaims: mockClaimRequests.length,
            pendingClaims: mockClaimRequests.filter(c => c.status === 'pending').length,
            approvedClaims: mockClaimRequests.filter(c => c.status === 'approved').length,
            rejectedClaims: mockClaimRequests.filter(c => c.status === 'rejected').length,
            totalDocuments: 12,
            totalPremium: mockPolicies.reduce((sum, policy) => sum + policy.premium, 0),
            insuranceTypes: {
              Health: mockPolicies.filter(p => p.type === 'Health').length,
              Auto: mockPolicies.filter(p => p.type === 'Auto').length,
              Home: mockPolicies.filter(p => p.type === 'Home').length,
            }
          });
          
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to load admin data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleVerifyCompany = async (companyId: string, verified: boolean) => {
    try {
      // In production, use this API call:
      // await adminApi.verifyCompany(companyId, verified);
      
      // For now, update state locally
      setCompanies(companies.map(company => 
        company.id === companyId ? { ...company, verified } : company
      ));
      
      toast.success(`Company ${verified ? 'verified' : 'unverified'} successfully`);
    } catch (error) {
      toast.error('Failed to update verification status');
    }
  };
  
  const filteredCompanies = companies.filter(company => 
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const prepareChartData = () => {
    if (!stats) return [];
    
    return [
      { name: 'Health', value: stats.insuranceTypes.Health },
      { name: 'Auto', value: stats.insuranceTypes.Auto },
      { name: 'Home', value: stats.insuranceTypes.Home },
    ];
  };
  
  const prepareClaimData = () => {
    if (!stats) return [];
    
    return [
      { name: 'Pending', value: stats.pendingClaims },
      { name: 'Approved', value: stats.approvedClaims },
      { name: 'Rejected', value: stats.rejectedClaims },
    ];
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl font-medium">Loading admin dashboard...</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {stats && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="flex flex-row items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Companies</p>
                      <p className="text-2xl font-bold">{stats.totalCompanies}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-row items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Policies</p>
                      <p className="text-2xl font-bold">{stats.totalPolicies}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-row items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Claims</p>
                      <p className="text-2xl font-bold">{stats.totalClaims}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-row items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Premium Value</p>
                      <p className="text-2xl font-bold">₹{stats.totalPremium.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Types Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prepareChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {prepareChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Claims Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareClaimData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Claims" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Claims</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Policy</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {claims.slice(0, 5).map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell>{claim.userDetails.name}</TableCell>
                          <TableCell>{claim.policyDetails.policyName}</TableCell>
                          <TableCell>₹{claim.claimAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <StatusBadge status={claim.status} />
                          </TableCell>
                          <TableCell>{new Date(claim.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search companies..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Insurance Types</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No companies found. Try a different search query.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="h-8 w-8 mr-2 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                              {company.logo ? (
                                <img src={company.logo} alt={company.companyName} className="h-full w-full object-cover" />
                              ) : (
                                <Building className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            {company.companyName}
                          </div>
                        </TableCell>
                        <TableCell>{company.contactPerson}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {company.insuranceTypes.map((type) => (
                              <span 
                                key={type} 
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {company.verified ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-600">
                              <Clock className="h-4 w-4 mr-1" />
                              Pending
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/company-profile/${company.id}`)}
                            >
                              View
                            </Button>
                            <Button 
                              variant={company.verified ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleVerifyCompany(company.id, !company.verified)}
                            >
                              {company.verified ? "Unverify" : "Verify"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No policies found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    policies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.policyName}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            {policy.type}
                          </div>
                        </TableCell>
                        <TableCell>₹{policy.premium.toLocaleString()}</TableCell>
                        <TableCell>₹{policy.coverage.toLocaleString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={policy.isActive ? "active" : "expired"} />
                        </TableCell>
                        <TableCell>
                          {companies.find(c => c.id === policy.companyId)?.companyName || policy.companyId}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Policy</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No claims found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    claims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.userDetails.name}</TableCell>
                        <TableCell>{claim.policyDetails.policyName}</TableCell>
                        <TableCell>₹{claim.claimAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={claim.status} />
                        </TableCell>
                        <TableCell>{new Date(claim.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/claims/${claim.id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
