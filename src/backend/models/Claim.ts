
import mongoose, { Schema, Document } from 'mongoose';
import { ClaimRequest } from '../../types/insurance';

export interface ClaimDocument extends Document, Omit<ClaimRequest, 'id' | 'documents' | 'userDetails' | 'policyDetails'> {
  documents: Array<{
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
  }>;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  policyDetails: {
    policyName: string;
    type: string;
  };
  // Additional properties
  updatedAt: Date;
}

const ClaimSchema = new Schema<ClaimDocument>(
  {
    userId: { type: String, required: true },
    policyId: { type: Schema.Types.ObjectId, ref: 'Policy', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    description: { type: String, required: true },
    claimAmount: { type: Number, required: true },
    documents: [{
      name: { type: String, required: true },
      type: { type: String, required: true },
      url: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now }
    }],
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    userDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    policyDetails: {
      policyName: { type: String, required: true },
      type: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const Claim = mongoose.model<ClaimDocument>('Claim', ClaimSchema);
