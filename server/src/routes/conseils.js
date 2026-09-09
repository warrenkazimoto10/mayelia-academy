import express from 'express';
import Conseil from '../models/Conseil.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/conseils - Récupérer tous les conseils
router.get('/', async (req, res) => {
  try {
    const conseils = await Conseil.findAll();
    res.json({
      success: true,
      data: conseils,
      count: conseils.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des conseils:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des conseils',
      message: error.message
    });
  }
});

// GET /api/conseils/:id - Récupérer un conseil par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conseil = await Conseil.findById(id);

    if (!conseil) {
      return res.status(404).json({
        success: false,
        error: 'Conseil non trouvé'
      });
    }

    res.json({
      success: true,
      data: conseil
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du conseil:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du conseil',
      message: error.message
    });
  }
});

// POST /api/conseils - Créer un nouveau conseil
router.post('/', requireAdmin, async (req, res) => {
  try {
    const conseil = await Conseil.create(req.body);
    res.status(201).json({
      success: true,
      data: conseil,
      message: 'Conseil créé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création du conseil:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création du conseil',
      message: error.message
    });
  }
});

// PUT /api/conseils/:id - Mettre à jour un conseil
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const conseil = await Conseil.update(id, req.body);

    if (!conseil) {
      return res.status(404).json({
        success: false,
        error: 'Conseil non trouvé'
      });
    }

    res.json({
      success: true,
      data: conseil,
      message: 'Conseil mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du conseil:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour du conseil',
      message: error.message
    });
  }
});

// DELETE /api/conseils/:id - Supprimer un conseil
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Conseil.delete(id);
    res.json({
      success: true,
      message: 'Conseil supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du conseil:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression du conseil',
      message: error.message
    });
  }
});

export default router;
