
import mongoose, { Schema, Document } from 'mongoose';
import { CompanyProfile } from '../../types/insurance';

export interface CompanyDocument extends Document, Omit<CompanyProfile, 'id'> {
  // Additional properties specific to the MongoDB document
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    companyName: { type: String, required: true },
    irdaiLicenseNumber: { type: String, required: true, unique: true },
    insuranceTypes: [{ type: String, enum: ['Health', 'Auto', 'Home'] }],
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    logo: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String },
    gstin: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Company = mongoose.model<CompanyDocument>('Company', CompanySchema);
