import express from 'express';
import FormationDomain from '../models/FormationDomain.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await FormationDomain.findAll();
    res.json({
      success: true,
      data,
      count: data.domaines.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des formations',
      message: error.message
    });
  }
});

/** Remplace tout l’arborescence (sync depuis l’admin JSON) */
router.put('/', requireAdmin, async (req, res) => {
  try {
    const data = await FormationDomain.replaceAll(req.body);
    res.json({
      success: true,
      data,
      message: 'Formations mises à jour'
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.message || 'Erreur de sauvegarde'
    });
  }
});

export default router;
