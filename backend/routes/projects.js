const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create project
router.post('/', async (req, res, next) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (err) { next(err); }
});
// Get all
router.get('/', async (req, res, next) => {
  try { res.json(await Project.find().sort('-createdAt')); }
  catch (err) { next(err); }
});
// Get one
router.get('/:id', async (req, res, next) => {
  try { res.json(await Project.findById(req.params.id)); }
  catch (err) { next(err); }
});
// Update
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
});
// Delete
router.delete('/:id', async (req, res, next) => {
  try { await Project.findByIdAndDelete(req.params.id); res.status(204).end(); }
  catch (err) { next(err); }
});
module.exports = router;