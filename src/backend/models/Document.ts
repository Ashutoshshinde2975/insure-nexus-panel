
import mongoose, { Schema, Document as IDocument } from 'mongoose';
import { Document as InsuranceDocument } from '../../types/insurance';

export interface DocumentDocument extends IDocument, Omit<InsuranceDocument, 'id'> {
  companyId: mongoose.Types.ObjectId;
  category: string;
  updatedAt: Date;
}

const DocumentSchema = new Schema<DocumentDocument>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    category: { 
      type: String, 
      enum: ['company', 'policy', 'claim', 'kyc', 'other'],
      required: true 
    }
  },
  { timestamps: true }
);

export const Document = mongoose.model<DocumentDocument>('Document', DocumentSchema);
