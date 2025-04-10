
import { useState } from "react";
import { toast } from "sonner";
import { Shield, AtSign, Phone, MapPin, Globe, Hash, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload } from "@/components/ui/file-upload";
import { mockCompanyProfile, mockCompanyDocuments } from "@/data/mockData";

const CompanyProfile = () => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleLogoUpload = async (file: File | null) => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Company logo updated successfully");
    } catch (error) {
      toast.error("Failed to update company logo");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <Button>Edit Profile</Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="verification">Verification Status</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                  <CardDescription>
                    Your company logo appears across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-40 w-40 mb-4">
                    <AvatarImage src={mockCompanyProfile.logo} alt={mockCompanyProfile.companyName} />
                    <AvatarFallback>{mockCompanyProfile.companyName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <FileUpload
                    label=""
                    accept=".jpg,.jpeg,.png"
                    allowedTypes={["image/jpeg", "image/png"]}
                    onChange={handleLogoUpload}
                  />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Your company details and registration information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Company Name</p>
                        <p className="font-medium">{mockCompanyProfile.companyName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">IRDAI License Number</p>
                        <p className="font-medium">{mockCompanyProfile.irdaiLicenseNumber}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Insurance Types</p>
                      <div className="flex flex-wrap gap-2">
                        {mockCompanyProfile.insuranceTypes.map((type) => (
                          <span key={type} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            <Shield className="inline-block h-3.5 w-3.5 mr-1" />
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Contact Person</p>
                        <p className="font-medium">{mockCompanyProfile.contactPerson}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <AtSign className="h-4 w-4 mr-1" /> Email
                        </p>
                        <p className="font-medium">{mockCompanyProfile.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-4 w-4 mr-1" /> Phone
                        </p>
                        <p className="font-medium">{mockCompanyProfile.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> Registration Date
                        </p>
                        <p className="font-medium">
                          {mockCompanyProfile.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> Business Address
                      </p>
                      <p className="font-medium">{mockCompanyProfile.address}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockCompanyProfile.website && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Globe className="h-4 w-4 mr-1" /> Website
                          </p>
                          <p className="font-medium">{mockCompanyProfile.website}</p>
                        </div>
                      )}
                      {mockCompanyProfile.gstin && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Hash className="h-4 w-4 mr-1" /> GSTIN
                          </p>
                          <p className="font-medium">{mockCompanyProfile.gstin}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                  All the documents you've submitted for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">IRDAI Certificate</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <FileUpload
                        label=""
                        accept=".pdf"
                        onChange={() => {}}
                        value={new File([], mockCompanyDocuments.irdaiCertificate.name)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Business Registration</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <FileUpload
                        label=""
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={() => {}}
                        value={new File([], mockCompanyDocuments.registrationCertificate.name)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">PAN Card</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <FileUpload
                        label=""
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={() => {}}
                        value={new File([], mockCompanyDocuments.panCard.name)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Bank Details</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <FileUpload
                        label=""
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={() => {}}
                        value={new File([], mockCompanyDocuments.bankDetails.name)}
                      />
                    </div>
                  </div>
                  
                  {mockCompanyDocuments.termsAndConditions && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Terms & Conditions</h3>
                      <div className="flex items-center gap-2 p-3 border rounded-md">
                        <FileUpload
                          label=""
                          accept=".pdf"
                          onChange={() => {}}
                          value={new File([], mockCompanyDocuments.termsAndConditions.name)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {mockCompanyDocuments.commissionAgreement && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Commission Agreement</h3>
                      <div className="flex items-center gap-2 p-3 border rounded-md">
                        <FileUpload
                          label=""
                          accept=".pdf"
                          onChange={() => {}}
                          value={new File([], mockCompanyDocuments.commissionAgreement.name)}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="md:col-span-2 space-y-2">
                    <h3 className="font-medium">KYC Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockCompanyDocuments.kycDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2 p-3 border rounded-md">
                          <FileUpload
                            label=""
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={() => {}}
                            value={new File([], doc.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>
                  Current status of your company verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center p-6">
                  {mockCompanyProfile.verified ? (
                    <>
                      <div className="h-16 w-16 rounded-full bg-insurance-green/20 flex items-center justify-center text-insurance-green mb-4">
                        <Shield className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-insurance-green mb-2">Verified</h3>
                      <p className="text-muted-foreground max-w-xl">
                        Your company has been verified and approved. You can now add policies and manage claims.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="h-16 w-16 rounded-full bg-insurance-yellow/20 flex items-center justify-center text-insurance-yellow mb-4">
                        <AlertCircle className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-insurance-yellow mb-2">Pending Verification</h3>
                      <p className="text-muted-foreground max-w-xl">
                        Your company verification is currently in progress. This usually takes 2-3 business days.
                        We'll notify you once the verification is complete.
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
