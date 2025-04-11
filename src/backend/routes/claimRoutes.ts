
import express from 'express';
import { Claim } from '../models/Claim';

const router = express.Router();

// Get all claims
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get claim by ID
router.get('/:id', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get claims by company ID
router.get('/company/:companyId', async (req, res) => {
  try {
    const claims = await Claim.find({ companyId: req.params.companyId });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create claim
router.post('/', async (req, res) => {
  try {
    const newClaim = new Claim(req.body);
    const savedClaim = await newClaim.save();
    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create claim', error });
  }
});

// Update claim status (approve/reject)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, reason } = req.body;
    
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updateData: any = { status };
    if (status === 'rejected' && reason) {
      updateData.rejectionReason = reason;
    }
    
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    
    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update claim status', error });
  }
});

// Update claim
router.put('/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update claim', error });
  }
});

// Delete claim
router.delete('/:id', async (req, res) => {
  try {
    const deletedClaim = await Claim.findByIdAndDelete(req.params.id);
    if (!deletedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json({ message: 'Claim deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export const claimRoutes = router;
