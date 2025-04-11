
import express from 'express';
import { Document } from '../models/Document';

const router = express.Router();

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get documents by company ID
router.get('/company/:companyId', async (req, res) => {
  try {
    const documents = await Document.find({ companyId: req.params.companyId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get documents by category
router.get('/category/:category', async (req, res) => {
  try {
    const documents = await Document.find({ category: req.params.category });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create document
router.post('/', async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create document', error });
  }
});

// Update document
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update document', error });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export const documentRoutes = router;
