
import mongoose, { Schema, Document } from 'mongoose';
import { Policy as IPolicy } from '../../types/insurance';

export interface PolicyDocument extends Document, Omit<IPolicy, 'id'> {
  // Additional properties specific to the MongoDB document
  createdAt: Date;
  updatedAt: Date;
}

const PolicySchema = new Schema<PolicyDocument>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    policyName: { type: String, required: true },
    type: { type: String, enum: ['Health', 'Auto', 'Home'], required: true },
    premium: { type: Number, required: true },
    coverage: { type: Number, required: true },
    termsDocUrl: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Policy = mongoose.model<PolicyDocument>('Policy', PolicySchema);
