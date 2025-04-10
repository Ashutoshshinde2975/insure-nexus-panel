
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Edit, 
  Trash, 
  Calendar, 
  DollarSign, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { StatusBadge } from "@/components/insurance/StatusBadge";
import { mockPolicies } from "@/data/mockData";
import { InsuranceType, Policy } from "@/types/insurance";

const formSchema = z.object({
  policyName: z.string().min(2, "Policy name must be at least 2 characters"),
  type: z.enum(["Health", "Auto", "Home"]),
  premium: z.coerce.number().min(1, "Premium must be greater than 0"),
  coverage: z.coerce.number().min(1, "Coverage must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  expiryDate: z.string().refine(val => {
    const date = new Date(val);
    return date > new Date();
  }, {
    message: "Expiry date must be in the future",
  }),
});

const PolicyManagement = () => {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsDocument, setTermsDocument] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyName: "",
      type: "Health",
      premium: 0,
      coverage: 0,
      description: "",
      expiryDate: "",
    },
  });
  
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.policyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || policy.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  const handleAddPolicy = async (values: z.infer<typeof formSchema>) => {
    if (!termsDocument) {
      toast.error("Please upload terms document");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPolicy: Policy = {
        id: `pol-${Date.now()}`,
        companyId: "comp-123",
        policyName: values.policyName,
        type: values.type as InsuranceType,
        premium: values.premium,
        coverage: values.coverage,
        termsDocUrl: "#",
        expiryDate: new Date(values.expiryDate),
        description: values.description,
        isActive: true,
        createdAt: new Date(),
      };
      
      setPolicies([newPolicy, ...policies]);
      setIsAddPolicyOpen(false);
      form.reset();
      setTermsDocument(null);
      toast.success("Policy added successfully");
    } catch (error) {
      toast.error("Failed to add policy");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeletePolicy = async (policyId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPolicies(policies.filter(policy => policy.id !== policyId));
      toast.success("Policy deleted successfully");
    } catch (error) {
      toast.error("Failed to delete policy");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Policy Management</h1>
        <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Insurance Policy</DialogTitle>
              <DialogDescription>
                Create a new insurance policy that will be available to users
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddPolicy)} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="policyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Policy Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter policy name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insurance type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Auto">Auto</SelectItem>
                            <SelectItem value="Home">Home</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="premium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Premium Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Enter premium amount" {...field} />
                        </FormControl>
                        <FormDescription>Annual premium amount in INR</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coverage Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Enter coverage amount" {...field} />
                        </FormControl>
                        <FormDescription>Maximum coverage amount in INR</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter policy description" 
                          className="resize-none h-20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FileUpload
                      label="Terms Document (PDF)"
                      description="Upload policy terms and conditions"
                      accept=".pdf"
                      onChange={setTermsDocument}
                      value={termsDocument}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Policy"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search policies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Auto">Auto</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Policy Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPolicies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No policies found. Try a different search or add a new policy.
                </TableCell>
              </TableRow>
            ) : (
              filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.policyName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      {policy.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      ₹{policy.premium.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    ₹{policy.coverage.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {policy.expiryDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={policy.isActive ? "active" : "expired"} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-insurance-red hover:text-insurance-red"
                        onClick={() => handleDeletePolicy(policy.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PolicyManagement;
