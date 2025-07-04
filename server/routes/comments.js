import express from 'express';
import Comment from '../models/Comment.js';
const router = express.Router();

// Create comment
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate('author post');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comment by id
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('author post');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update comment
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
