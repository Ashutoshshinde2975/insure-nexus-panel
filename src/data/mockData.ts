
import { ClaimRequest, CompanyDocuments, CompanyProfile, Document, Policy } from "@/types/insurance";

// Mock company profile
export const mockCompanyProfile: CompanyProfile = {
  id: "comp-123",
  companyName: "SecureLife Insurance Co.",
  irdaiLicenseNumber: "IRDAI123456",
  insuranceTypes: ["Health", "Auto", "Home"],
  contactPerson: "John Smith",
  email: "john@securelife.com",
  phone: "+91 9876543210",
  logo: "/placeholder.svg",
  address: "123 Insurance Street, Mumbai, Maharashtra, 400001",
  website: "https://securelife.com",
  gstin: "22AAAAA0000A1Z5",
  verified: true,
  createdAt: new Date("2023-01-15")
};

// Mock documents
const mockDocument: Document = {
  id: "doc-123",
  name: "IRDAI Certificate",
  type: "application/pdf",
  url: "#",
  uploadedAt: new Date("2023-01-15")
};

export const mockCompanyDocuments: CompanyDocuments = {
  id: "docs-123",
  companyId: "comp-123",
  irdaiCertificate: { ...mockDocument, id: "doc-1", name: "IRDAI Certificate" },
  registrationCertificate: { ...mockDocument, id: "doc-2", name: "Business Registration" },
  panCard: { ...mockDocument, id: "doc-3", name: "PAN Card" },
  bankDetails: { ...mockDocument, id: "doc-4", name: "Bank Details" },
  termsAndConditions: { ...mockDocument, id: "doc-5", name: "Terms & Conditions" },
  commissionAgreement: { ...mockDocument, id: "doc-6", name: "Commission Agreement" },
  kycDocuments: [
    { ...mockDocument, id: "doc-7", name: "Aadhaar Card" },
    { ...mockDocument, id: "doc-8", name: "PAN Card" }
  ]
};

// Mock policies
export const mockPolicies: Policy[] = [
  {
    id: "pol-123",
    companyId: "comp-123",
    policyName: "Comprehensive Health Insurance",
    type: "Health",
    premium: 12000,
    coverage: 500000,
    termsDocUrl: "#",
    expiryDate: new Date("2025-12-31"),
    description: "Comprehensive health coverage for individuals and families.",
    isActive: true,
    createdAt: new Date("2023-02-10")
  },
  {
    id: "pol-124",
    companyId: "comp-123",
    policyName: "Standard Auto Insurance",
    type: "Auto",
    premium: 8000,
    coverage: 300000,
    termsDocUrl: "#",
    expiryDate: new Date("2025-10-15"),
    description: "Standard coverage for all types of vehicles.",
    isActive: true,
    createdAt: new Date("2023-03-05")
  },
  {
    id: "pol-125",
    companyId: "comp-123",
    policyName: "Premium Home Insurance",
    type: "Home",
    premium: 15000,
    coverage: 1000000,
    termsDocUrl: "#",
    expiryDate: new Date("2025-08-20"),
    description: "Premium coverage for home and belongings.",
    isActive: true,
    createdAt: new Date("2023-04-12")
  },
  {
    id: "pol-126",
    companyId: "comp-123",
    policyName: "Senior Citizen Health Plan",
    type: "Health",
    premium: 18000,
    coverage: 700000,
    termsDocUrl: "#",
    expiryDate: new Date("2025-06-30"),
    description: "Specialized health coverage for senior citizens.",
    isActive: true,
    createdAt: new Date("2023-05-15")
  },
  {
    id: "pol-127",
    companyId: "comp-123",
    policyName: "Two-Wheeler Insurance",
    type: "Auto",
    premium: 3000,
    coverage: 100000,
    termsDocUrl: "#",
    expiryDate: new Date("2025-09-25"),
    description: "Affordable coverage for two-wheelers.",
    isActive: true,
    createdAt: new Date("2023-06-08")
  }
];

// Mock claim requests
export const mockClaimRequests: ClaimRequest[] = [
  {
    id: "claim-123",
    userId: "user-123",
    policyId: "pol-123",
    companyId: "comp-123",
    description: "Hospital admission due to fever and infection",
    claimAmount: 50000,
    documents: [
      { ...mockDocument, id: "cdoc-1", name: "Hospital Bill" },
      { ...mockDocument, id: "cdoc-2", name: "Doctor Prescription" }
    ],
    status: "pending",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10"),
    userDetails: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543211"
    },
    policyDetails: {
      policyName: "Comprehensive Health Insurance",
      type: "Health"
    }
  },
  {
    id: "claim-124",
    userId: "user-124",
    policyId: "pol-124",
    companyId: "comp-123",
    description: "Car damage due to accident",
    claimAmount: 75000,
    documents: [
      { ...mockDocument, id: "cdoc-3", name: "Accident Report" },
      { ...mockDocument, id: "cdoc-4", name: "Repair Estimate" },
      { ...mockDocument, id: "cdoc-5", name: "Photos of Damage" }
    ],
    status: "approved",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-20"),
    userDetails: {
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 9876543212"
    },
    policyDetails: {
      policyName: "Standard Auto Insurance",
      type: "Auto"
    }
  },
  {
    id: "claim-125",
    userId: "user-125",
    policyId: "pol-125",
    companyId: "comp-123",
    description: "Water damage due to pipe burst",
    claimAmount: 120000,
    documents: [
      { ...mockDocument, id: "cdoc-6", name: "Plumber Report" },
      { ...mockDocument, id: "cdoc-7", name: "Photos of Damage" },
      { ...mockDocument, id: "cdoc-8", name: "Repair Estimate" }
    ],
    status: "rejected",
    createdAt: new Date("2023-05-25"),
    updatedAt: new Date("2023-06-01"),
    userDetails: {
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "+91 9876543213"
    },
    policyDetails: {
      policyName: "Premium Home Insurance",
      type: "Home"
    }
  },
  {
    id: "claim-126",
    userId: "user-126",
    policyId: "pol-123",
    companyId: "comp-123",
    description: "Surgery for knee replacement",
    claimAmount: 250000,
    documents: [
      { ...mockDocument, id: "cdoc-9", name: "Hospital Bill" },
      { ...mockDocument, id: "cdoc-10", name: "Doctor's Certificate" },
      { ...mockDocument, id: "cdoc-11", name: "Medical Reports" }
    ],
    status: "pending",
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    userDetails: {
      name: "Sunita Verma",
      email: "sunita@example.com",
      phone: "+91 9876543214"
    },
    policyDetails: {
      policyName: "Comprehensive Health Insurance",
      type: "Health"
    }
  },
  {
    id: "claim-127",
    userId: "user-127",
    policyId: "pol-127",
    companyId: "comp-123",
    description: "Bike stolen from apartment parking",
    claimAmount: 80000,
    documents: [
      { ...mockDocument, id: "cdoc-12", name: "Police FIR" },
      { ...mockDocument, id: "cdoc-13", name: "Ownership Documents" }
    ],
    status: "pending",
    createdAt: new Date("2023-07-08"),
    updatedAt: new Date("2023-07-08"),
    userDetails: {
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543215"
    },
    policyDetails: {
      policyName: "Two-Wheeler Insurance",
      type: "Auto"
    }
  }
];
