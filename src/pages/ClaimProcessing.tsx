import { useState } from "react";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Shield, 
  DollarSign, 
  CalendarClock, 
  ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/insurance/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClaimRequests } from "@/data/mockData";
import { ClaimRequest } from "@/types/insurance";

const ClaimProcessing = () => {
  const [claims, setClaims] = useState<ClaimRequest[]>(mockClaimRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);
  const [isViewClaimOpen, setIsViewClaimOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = 
      claim.userDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyDetails.policyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || claim.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  const handleViewClaim = (claim: ClaimRequest) => {
    setSelectedClaim(claim);
    setIsViewClaimOpen(true);
  };
  
  const handleApproveClaim = async () => {
    if (!selectedClaim) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setClaims(claims.map(claim => 
        claim.id === selectedClaim.id ? { ...claim, status: "approved", updatedAt: new Date() } : claim
      ));
      
      setIsViewClaimOpen(false);
      toast.success("Claim approved successfully");
    } catch (error) {
      toast.error("Failed to approve claim");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRejectClaim = async () => {
    if (!selectedClaim || !rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setClaims(claims.map(claim => 
        claim.id === selectedClaim.id ? { 
          ...claim, 
          status: "rejected", 
          updatedAt: new Date(),
          rejectionReason: rejectionReason
        } : claim
      ));
      
      setIsViewClaimOpen(false);
      setRejectionReason("");
      toast.success("Claim rejected successfully");
    } catch (error) {
      toast.error("Failed to reject claim");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Claim Processing</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by customer name or policy..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Policy</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No claims found. Try a different search or filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{claim.userDetails.name}</p>
                        <p className="text-xs text-muted-foreground">{claim.userDetails.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">{claim.policyDetails.policyName}</p>
                        <p className="text-xs text-muted-foreground">{claim.policyDetails.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">₹{claim.claimAmount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{claim.createdAt.toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => handleViewClaim(claim)}>
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedClaim && (
        <Dialog open={isViewClaimOpen} onOpenChange={setIsViewClaimOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Claim Details</DialogTitle>
              <DialogDescription>
                Review the claim details and take appropriate action
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Claim Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="history">Claim History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Customer Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Customer Name</p>
                          <p className="font-medium">{selectedClaim.userDetails.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Email Address</p>
                          <p className="font-medium">{selectedClaim.userDetails.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium">{selectedClaim.userDetails.phone}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Policy Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Policy Name</p>
                          <p className="font-medium">{selectedClaim.policyDetails.policyName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Policy Type</p>
                          <p className="font-medium">{selectedClaim.policyDetails.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Policy ID</p>
                          <p className="font-medium">{selectedClaim.policyId}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-base">Claim Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Claim ID</p>
                          <p className="font-medium">{selectedClaim.id}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Claim Amount</p>
                          <p className="font-medium text-lg">₹{selectedClaim.claimAmount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Submission Date</p>
                          <p className="font-medium">{selectedClaim.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Current Status</p>
                          <StatusBadge status={selectedClaim.status} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Claim Description</p>
                          <p className="border rounded-md p-3 bg-muted/30">
                            {selectedClaim.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Submitted Documents</CardTitle>
                      <CardDescription>
                        Documents uploaded by the customer to support the claim
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedClaim.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-md">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on {doc.uploadedAt.toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Claim History</CardTitle>
                      <CardDescription>
                        Timeline of events related to this claim
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                            <ClipboardCheck className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Claim Created</p>
                            <p className="text-sm text-muted-foreground">
                              Customer submitted the claim request
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {selectedClaim.createdAt.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {selectedClaim.updatedAt > selectedClaim.createdAt && (
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                              {selectedClaim.status === "approved" ? (
                                <CheckCircle className="h-4 w-4 text-insurance-green" />
                              ) : (
                                <XCircle className="h-4 w-4 text-insurance-red" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">
                                Claim {selectedClaim.status === "approved" ? "Approved" : "Rejected"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedClaim.status === "approved" 
                                  ? "The claim was approved by the insurance provider" 
                                  : "The claim was rejected by the insurance provider"}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {selectedClaim.updatedAt.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {selectedClaim.status === "pending" && (
              <div className="mt-6 space-y-4">
                <div className="border-t pt-4">
                  <h3 className="text-base font-medium mb-2">Claim Action</h3>
                  {rejectionReason.trim() ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Reason for Rejection</p>
                      <Textarea 
                        value={rejectionReason} 
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Provide a reason for rejecting this claim..."
                        className="resize-none"
                      />
                    </div>
                  ) : null}
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  {!rejectionReason.trim() ? (
                    <Button 
                      variant="outline" 
                      className="border-insurance-red text-insurance-red hover:bg-insurance-red/10"
                      onClick={() => setRejectionReason("Please provide a reason")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Claim
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive"
                      disabled={isProcessing}
                      onClick={handleRejectClaim}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {isProcessing ? "Rejecting..." : "Confirm Rejection"}
                    </Button>
                  )}
                  
                  <Button 
                    disabled={isProcessing || rejectionReason.trim() !== ""}
                    onClick={handleApproveClaim}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isProcessing ? "Approving..." : "Approve Claim"}
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClaimProcessing;
