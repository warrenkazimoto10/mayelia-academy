import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mayelia_academy'
    });

    console.log('🌱 Début du seed des données...');

    // Importer les actualités depuis le fichier TypeScript
    // Note: En production, vous devriez utiliser un fichier JSON ou une autre méthode
    // Pour l'instant, nous allons créer quelques exemples manuellement
    
    // Exemple d'actualité 1
    const [result1] = await connection.execute(`
      INSERT INTO actualites 
      (title, excerpt, category, date, read_time, category_color, hero_image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Saviez-vous que chez Mayelia Academy, nous ne faisons pas que de la formation classique ?',
      'En plus de nos cours, nous disposons de simulateurs de conduite modernes pour poids léger et poids lourd, permettant aux apprenants de s\'entraîner dans des conditions proches de la réalité.',
      'Innovation',
      '20 Jan 2025',
      '3 min',
      'bg-primary/10 text-primary',
      '/assets/actualite/simulateur.jpg'
    ]);

    const actualiteId1 = result1.insertId;
    
    await connection.execute(`
      INSERT INTO actualite_paragraphs 
      (actualite_id, text, image_src, image_alt, image_caption, display_order)
      VALUES 
      (?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?)
    `, [
      actualiteId1, 'Saviez-vous que chez Mayelia Academy, nous ne faisons pas que de la formation classique ?', null, null, null, 0,
      actualiteId1, 'En plus de nos cours, nous disposons de simulateurs de conduite modernes :\n🔹 poids léger\n🔹 poids lourd', null, null, null, 1,
      actualiteId1, 'Ces simulateurs permettent aux apprenants de s\'entraîner dans des conditions proches de la réalité, en toute sécurité, avant de prendre la route.', '/assets/actualite/simulateur.jpg', 'Simulateur de conduite Mayelia Academy', 'Simulateur de conduite moderne pour poids léger et poids lourd', 2
    ]);

    console.log('✅ Actualités seedées avec succès !');
    console.log(`📊 ${actualiteId1} actualité(s) créée(s)`);

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seed();
