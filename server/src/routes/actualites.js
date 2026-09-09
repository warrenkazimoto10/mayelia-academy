import express from 'express';
import Actualite from '../models/Actualite.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/actualites - Récupérer toutes les actualités
router.get('/', async (req, res) => {
  try {
    const actualites = await Actualite.findAll();
    res.json({
      success: true,
      data: actualites,
      count: actualites.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des actualités',
      message: error.message
    });
  }
});

// GET /api/actualites/:id - Récupérer une actualité par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualite = await Actualite.findById(id);

    if (!actualite) {
      return res.status(404).json({
        success: false,
        error: 'Actualité non trouvée'
      });
    }

    res.json({
      success: true,
      data: actualite
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'actualité:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'actualité',
      message: error.message
    });
  }
});

// POST /api/actualites - Créer une nouvelle actualité
router.post('/', requireAdmin, async (req, res) => {
  try {
    const actualite = await Actualite.create(req.body);
    res.status(201).json({
      success: true,
      data: actualite,
      message: 'Actualité créée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'actualité:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de l\'actualité',
      message: error.message
    });
  }
});

// PUT /api/actualites/:id - Mettre à jour une actualité
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const actualite = await Actualite.update(id, req.body);

    if (!actualite) {
      return res.status(404).json({
        success: false,
        error: 'Actualité non trouvée'
      });
    }

    res.json({
      success: true,
      data: actualite,
      message: 'Actualité mise à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'actualité:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour de l\'actualité',
      message: error.message
    });
  }
});

// DELETE /api/actualites/:id - Supprimer une actualité
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Actualite.delete(id);
    res.json({
      success: true,
      message: 'Actualité supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'actualité:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de l\'actualité',
      message: error.message
    });
  }
});

export default router;
