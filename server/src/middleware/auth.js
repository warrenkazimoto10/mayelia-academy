/**
 * Authentification admin : header Authorization: Bearer <ADMIN_SECRET>
 * Définir ADMIN_SECRET dans server/.env (voir .env.example)
 */
export function requireAdmin(req, res, next) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    console.warn('[auth] ADMIN_SECRET non défini — mutations API désactivées');
    return res.status(503).json({
      success: false,
      error: 'Administration non configurée (ADMIN_SECRET manquant sur le serveur)'
    });
  }

  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token || token !== secret) {
    return res.status(401).json({
      success: false,
      error: 'Non autorisé'
    });
  }

  next();
}
