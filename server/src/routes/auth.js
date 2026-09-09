import express from 'express';

const router = express.Router();

/**
 * POST /api/auth/login { "password": "..." }
 * Répond { success, data: { token } } si le mot de passe correspond à ADMIN_SECRET.
 */
router.post('/login', (req, res) => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return res.status(503).json({
      success: false,
      error: 'ADMIN_SECRET non configuré sur le serveur'
    });
  }

  const password = req.body?.password;
  if (!password || password !== secret) {
    return res.status(401).json({
      success: false,
      error: 'Identifiants incorrects'
    });
  }

  res.json({
    success: true,
    data: { token: secret },
    message: 'Connexion réussie'
  });
});

router.get('/ping', (req, res) => {
  res.json({
    success: true,
    adminConfigured: Boolean(process.env.ADMIN_SECRET)
  });
});

export default router;
