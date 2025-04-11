
import express from 'express';
import { Company } from '../models/Company';
import { Policy } from '../models/Policy';
import { Claim } from '../models/Claim';
import { Document } from '../models/Document';

const router = express.Router();

// Get overall statistics
router.get('/stats', async (req, res) => {
  try {
    const companiesCount = await Company.countDocuments();
    const policiesCount = await Policy.countDocuments();
    const claimsCount = await Claim.countDocuments();
    const documentsCount = await Document.countDocuments();
    
    const pendingClaimsCount = await Claim.countDocuments({ status: 'pending' });
    
    // Get policy distribution by type
    const policyDistribution = await Policy.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const stats = {
      companies: companiesCount,
      policies: policiesCount,
      claims: claimsCount,
      documents: documentsCount,
      pendingClaims: pendingClaimsCount,
      policyDistribution: policyDistribution.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Error fetching admin statistics' });
  }
});

// Get all companies with verification status
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find().select('companyName irdaiLicenseNumber email verified');
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
});

// Verify a company
router.put('/companies/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;
    
    const company = await Company.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Error verifying company:', error);
    res.status(500).json({ message: 'Error verifying company' });
  }
});

// Get recent claims for admin dashboard
router.get('/recent-claims', async (req, res) => {
  try {
    const recentClaims = await Claim.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('policyId', 'policyName');
    
    res.json(recentClaims);
  } catch (error) {
    console.error('Error fetching recent claims:', error);
    res.status(500).json({ message: 'Error fetching recent claims' });
  }
});

export default router;
