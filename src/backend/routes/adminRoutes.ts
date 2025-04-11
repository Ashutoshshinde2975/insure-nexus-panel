
import express from 'express';
import { Company } from '../models/Company';
import { Policy } from '../models/Policy';
import { Claim } from '../models/Claim';
import { Document } from '../models/Document';

const router = express.Router();

// Admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const totalPolicies = await Policy.countDocuments();
    const totalClaims = await Claim.countDocuments();
    const pendingClaims = await Claim.countDocuments({ status: 'pending' });
    const approvedClaims = await Claim.countDocuments({ status: 'approved' });
    const rejectedClaims = await Claim.countDocuments({ status: 'rejected' });
    const totalDocuments = await Document.countDocuments();
    
    // Premium sum
    const policies = await Policy.find();
    const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
    
    // Insurance types distribution
    const healthPolicies = await Policy.countDocuments({ type: 'Health' });
    const autoPolicies = await Policy.countDocuments({ type: 'Auto' });
    const homePolicies = await Policy.countDocuments({ type: 'Home' });
    
    res.json({
      totalCompanies,
      totalPolicies,
      totalClaims,
      pendingClaims,
      approvedClaims,
      rejectedClaims,
      totalDocuments,
      totalPremium,
      insuranceTypes: {
        Health: healthPolicies,
        Auto: autoPolicies,
        Home: homePolicies
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all companies with detailed info for admin
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Verify a company
router.put('/companies/:id/verify', async (req, res) => {
  try {
    const { verified } = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { verified },
      { new: true }
    );
    
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update verification status', error });
  }
});

// Get recent claims for admin dashboard
router.get('/recent-claims', async (req, res) => {
  try {
    const recentClaims = await Claim.find()
      .sort({ createdAt: -1 })
      .limit(5);
      
    res.json(recentClaims);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export = router;
