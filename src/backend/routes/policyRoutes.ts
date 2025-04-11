
import express from 'express';
import { Policy } from '../models/Policy';

const router = express.Router();

// Get all policies
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get policy by ID
router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get policies by company ID
router.get('/company/:companyId', async (req, res) => {
  try {
    const policies = await Policy.find({ companyId: req.params.companyId });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create policy
router.post('/', async (req, res) => {
  try {
    const newPolicy = new Policy(req.body);
    const savedPolicy = await newPolicy.save();
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create policy', error });
  }
});

// Update policy
router.put('/:id', async (req, res) => {
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update policy', error });
  }
});

// Delete policy
router.delete('/:id', async (req, res) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export const policyRoutes = router;
