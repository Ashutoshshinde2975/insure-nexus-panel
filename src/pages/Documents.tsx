
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Folder, Search, Upload, Download, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { mockCompanyDocuments } from "@/data/mockData";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [documentCategory, setDocumentCategory] = useState("company");
  
  // Generate document list from mock data
  const documents = [
    { id: "doc-1", name: "IRDAI Certificate", category: "company", type: "PDF", size: "1.2 MB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-2", name: "Business Registration", category: "company", type: "PDF", size: "2.5 MB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-3", name: "PAN Card", category: "company", type: "JPG", size: "800 KB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-4", name: "Bank Details", category: "company", type: "PDF", size: "1.1 MB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-5", name: "Terms & Conditions", category: "policy", type: "PDF", size: "3.2 MB", uploadedAt: new Date("2023-02-10") },
    { id: "doc-6", name: "Commission Agreement", category: "company", type: "PDF", size: "1.8 MB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-7", name: "Aadhaar Card", category: "kyc", type: "PDF", size: "1.5 MB", uploadedAt: new Date("2023-01-15") },
    { id: "doc-8", name: "Claim Processing Guidelines", category: "policy", type: "PDF", size: "2.3 MB", uploadedAt: new Date("2023-03-20") },
    { id: "doc-9", name: "Health Insurance Policy Template", category: "policy", type: "DOCX", size: "1.7 MB", uploadedAt: new Date("2023-02-15") },
    { id: "doc-10", name: "Auto Insurance Policy Template", category: "policy", type: "DOCX", size: "1.8 MB", uploadedAt: new Date("2023-02-16") },
    { id: "doc-11", name: "Home Insurance Policy Template", category: "policy", type: "DOCX", size: "1.9 MB", uploadedAt: new Date("2023-02-17") },
    { id: "doc-12", name: "Claim Form Template", category: "claim", type: "PDF", size: "1.1 MB", uploadedAt: new Date("2023-03-10") },
  ];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleUploadDocument = async () => {
    if (!uploadedFile || !documentCategory) {
      toast.error("Please select a file and category");
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Document uploaded successfully");
      setUploadDialogOpen(false);
      setUploadedFile(null);
    } catch (error) {
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload documents related to your insurance company
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <FileUpload
                label="Select Document"
                description="Upload a document (PDF, DOCX, JPG, PNG)"
                accept=".pdf,.docx,.jpg,.jpeg,.png"
                onChange={setUploadedFile}
                value={uploadedFile}
              />
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Document Category</label>
                <Select value={documentCategory} onValueChange={setDocumentCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company Documents</SelectItem>
                    <SelectItem value="policy">Policy Documents</SelectItem>
                    <SelectItem value="claim">Claim Documents</SelectItem>
                    <SelectItem value="kyc">KYC Documents</SelectItem>
                    <SelectItem value="other">Other Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadDocument} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Document"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="policy">Policy</TabsTrigger>
            <TabsTrigger value="claim">Claims</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Folder className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="company">Company Documents</SelectItem>
                <SelectItem value="policy">Policy Documents</SelectItem>
                <SelectItem value="claim">Claim Documents</SelectItem>
                <SelectItem value="kyc">KYC Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all">
          <DocumentGrid documents={filteredDocuments} />
        </TabsContent>
        
        <TabsContent value="company">
          <DocumentGrid documents={filteredDocuments.filter(doc => doc.category === "company")} />
        </TabsContent>
        
        <TabsContent value="policy">
          <DocumentGrid documents={filteredDocuments.filter(doc => doc.category === "policy")} />
        </TabsContent>
        
        <TabsContent value="claim">
          <DocumentGrid documents={filteredDocuments.filter(doc => doc.category === "claim")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DocumentGridProps {
  documents: Array<{
    id: string;
    name: string;
    category: string;
    type: string;
    size: string;
    uploadedAt: Date;
  }>;
}

const DocumentGrid = ({ documents }: DocumentGridProps) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
        <p className="text-lg font-medium">No documents found</p>
        <p className="text-sm text-muted-foreground">
          Try a different search or upload a new document
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-primary/5 border-b p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-muted-foreground">
                  Uploaded on {doc.uploadedAt.toLocaleDateString()}
                </div>
                <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="text-insurance-red">
                  <Trash className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Documents;
