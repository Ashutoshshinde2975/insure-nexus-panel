
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { InsuranceType } from "@/types/insurance";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  irdaiLicenseNumber: z.string().min(5, "IRDAI license number is required."),
  insuranceTypes: z.array(z.string()).min(1, "Select at least one insurance type."),
  contactPerson: z.string().min(2, "Contact person name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  address: z.string().min(5, "Business address is required."),
  website: z.string().url("Invalid URL.").optional().or(z.literal("")),
  gstin: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  }),
});

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const insuranceTypes: { label: string; value: InsuranceType }[] = [
    { label: "Health Insurance", value: "Health" },
    { label: "Auto Insurance", value: "Auto" },
    { label: "Home Insurance", value: "Home" },
  ];
  
  const [documents, setDocuments] = useState({
    irdaiCertificate: null as File | null,
    registrationCertificate: null as File | null,
    panCard: null as File | null,
    bankDetails: null as File | null,
    termsAndConditions: null as File | null,
    commissionAgreement: null as File | null,
    kycDocuments: null as File | null,
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      irdaiLicenseNumber: "",
      insuranceTypes: [],
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      gstin: "",
      termsAgreed: false,
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    // Check if required documents are uploaded
    if (!documents.irdaiCertificate || !documents.registrationCertificate || 
        !documents.panCard || !documents.bankDetails || !documents.kycDocuments) {
      toast.error("Please upload all required documents");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Combine form values and documents
      const registrationData = {
        ...values,
        documents,
      };
      
      console.log("Registration data:", registrationData);
      
      toast.success("Registration successful! Please wait for verification.");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-insurance-blue text-white rounded-t-lg">
          <CardTitle className="text-2xl">Insurance Company Registration</CardTitle>
          <CardDescription className="text-white/80">
            Register your insurance company to get started with InsureNexus
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="pt-6">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="text-xl font-semibold mb-4">
                    Step 1: Company Information
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="irdaiLicenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IRDAI License Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter IRDAI license number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insuranceTypes"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Insurance Types</FormLabel>
                            <FormDescription>
                              Select the types of insurance you provide
                            </FormDescription>
                          </div>
                          {insuranceTypes.map((type) => (
                            <FormField
                              key={type.value}
                              control={form.control}
                              name="insuranceTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={type.value}
                                    className="flex flex-row items-start space-x-3 space-y-0 py-1"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(type.value)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, type.value])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== type.value
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {type.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Authorized Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter contact person name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter complete business address" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter GSTIN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-xl font-semibold mb-4">
                    Step 2: Document Upload
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload
                      label="IRDAI Certificate (PDF)"
                      description="Upload your IRDAI certificate"
                      accept=".pdf"
                      onChange={(file) => setDocuments({ ...documents, irdaiCertificate: file })}
                      value={documents.irdaiCertificate}
                    />
                    
                    <FileUpload
                      label="Business Registration Certificate"
                      description="Upload your business registration certificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(file) => setDocuments({ ...documents, registrationCertificate: file })}
                      value={documents.registrationCertificate}
                    />
                    
                    <FileUpload
                      label="Company PAN Card"
                      description="Upload your company PAN card"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(file) => setDocuments({ ...documents, panCard: file })}
                      value={documents.panCard}
                    />
                    
                    <FileUpload
                      label="Bank Details and Cancelled Cheque"
                      description="Upload your bank details and cancelled cheque"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(file) => setDocuments({ ...documents, bankDetails: file })}
                      value={documents.bankDetails}
                    />
                    
                    <FileUpload
                      label="Terms and Conditions (Optional)"
                      description="Upload your terms and conditions document"
                      accept=".pdf"
                      onChange={(file) => setDocuments({ ...documents, termsAndConditions: file })}
                      value={documents.termsAndConditions}
                    />
                    
                    <FileUpload
                      label="Commission Agreement (Optional)"
                      description="Upload your commission agreement document"
                      accept=".pdf"
                      onChange={(file) => setDocuments({ ...documents, commissionAgreement: file })}
                      value={documents.commissionAgreement}
                    />
                    
                    <div className="md:col-span-2">
                      <FileUpload
                        label="KYC Documents of the Authorized Person"
                        description="Upload Aadhaar, PAN, or Passport of the authorized person"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(file) => setDocuments({ ...documents, kycDocuments: file })}
                        value={documents.kycDocuments}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions and verify that all information provided is accurate
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="border-t p-6 flex justify-between">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              
              <div className={step === 1 ? "ml-auto" : ""}>
                <Button type="submit" disabled={isSubmitting}>
                  {step === 1 ? "Next" : isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
