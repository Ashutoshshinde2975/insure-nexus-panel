
import axios from 'axios';
import { CompanyProfile, Policy, ClaimRequest, Document } from '@/types/insurance';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Company API
export const companyApi = {
  getAll: () => api.get<CompanyProfile[]>('/companies'),
  getById: (id: string) => api.get<CompanyProfile>(`/companies/${id}`),
  create: (company: Omit<CompanyProfile, 'id' | 'createdAt'>) => 
    api.post<CompanyProfile>('/companies', company),
  update: (id: string, company: Partial<CompanyProfile>) => 
    api.put<CompanyProfile>(`/companies/${id}`, company),
  delete: (id: string) => 
    api.delete(`/companies/${id}`)
};

// Policy API
export const policyApi = {
  getAll: () => api.get<Policy[]>('/policies'),
  getById: (id: string) => api.get<Policy>(`/policies/${id}`),
  getByCompany: (companyId: string) => 
    api.get<Policy[]>(`/policies/company/${companyId}`),
  create: (policy: Omit<Policy, 'id' | 'createdAt'>) => 
    api.post<Policy>('/policies', policy),
  update: (id: string, policy: Partial<Policy>) => 
    api.put<Policy>(`/policies/${id}`, policy),
  delete: (id: string) => 
    api.delete(`/policies/${id}`)
};

// Claim API
export const claimApi = {
  getAll: () => api.get<ClaimRequest[]>('/claims'),
  getById: (id: string) => api.get<ClaimRequest>(`/claims/${id}`),
  getByCompany: (companyId: string) => 
    api.get<ClaimRequest[]>(`/claims/company/${companyId}`),
  create: (claim: Omit<ClaimRequest, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<ClaimRequest>('/claims', claim),
  updateStatus: (id: string, status: 'approved' | 'rejected' | 'pending', reason?: string) => 
    api.put<ClaimRequest>(`/claims/${id}/status`, { status, reason }),
  update: (id: string, claim: Partial<ClaimRequest>) => 
    api.put<ClaimRequest>(`/claims/${id}`, claim),
  delete: (id: string) => 
    api.delete(`/claims/${id}`)
};

// Document API
export const documentApi = {
  getAll: () => api.get<Document[]>('/documents'),
  getById: (id: string) => api.get<Document>(`/documents/${id}`),
  getByCompany: (companyId: string) => 
    api.get<Document[]>(`/documents/company/${companyId}`),
  getByCategory: (category: string) => 
    api.get<Document[]>(`/documents/category/${category}`),
  create: (document: Omit<Document & { companyId: string, category: string }, 'id'>) => 
    api.post<Document>('/documents', document),
  update: (id: string, document: Partial<Document>) => 
    api.put<Document>(`/documents/${id}`, document),
  delete: (id: string) => 
    api.delete(`/documents/${id}`)
};

// Admin API
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getAllCompanies: () => api.get('/admin/companies'),
  verifyCompany: (id: string, verified: boolean) => 
    api.put(`/admin/companies/${id}/verify`, { verified }),
  getRecentClaims: () => api.get('/admin/recent-claims')
};

export default {
  company: companyApi,
  policy: policyApi,
  claim: claimApi,
  document: documentApi,
  admin: adminApi
};
