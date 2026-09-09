import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Créer le pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mayelia_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test de connexion
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion à MySQL établie avec succès');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MySQL:', err.message);
    console.log('💡 Assurez-vous que MySQL est démarré et que la base de données existe');
  });

export default pool;
