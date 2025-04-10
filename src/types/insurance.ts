
// Insurance Types
export type InsuranceType = 'Health' | 'Auto' | 'Home';

export interface CompanyProfile {
  id: string;
  companyName: string;
  irdaiLicenseNumber: string;
  insuranceTypes: InsuranceType[];
  contactPerson: string;
  email: string;
  phone: string;
  logo: string;
  address: string;
  website?: string;
  gstin?: string;
  verified: boolean;
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface CompanyDocuments {
  id: string;
  companyId: string;
  irdaiCertificate: Document;
  registrationCertificate: Document;
  panCard: Document;
  bankDetails: Document;
  termsAndConditions?: Document;
  commissionAgreement?: Document;
  kycDocuments: Document[];
}

export interface Policy {
  id: string;
  companyId: string;
  policyName: string;
  type: InsuranceType;
  premium: number;
  coverage: number;
  termsDocUrl: string;
  expiryDate: Date;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ClaimRequest {
  id: string;
  userId: string;
  policyId: string;
  companyId: string;
  description: string;
  claimAmount: number;
  documents: Document[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  policyDetails: {
    policyName: string;
    type: InsuranceType;
  };
}
