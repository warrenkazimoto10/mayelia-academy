import pool from '../database/db.js';

class Actualite {
  // Récupérer toutes les actualités
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT 
        a.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', ap.id,
            'text', ap.text,
            'image', JSON_OBJECT(
              'src', ap.image_src,
              'alt', ap.image_alt,
              'caption', ap.image_caption
            ),
            'displayOrder', ap.display_order
          ) ORDER BY ap.display_order
          SEPARATOR '|'
        ) as paragraphs_json
      FROM actualites a
      LEFT JOIN actualite_paragraphs ap ON a.id = ap.actualite_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `);

    return rows.map(row => {
      const actualite = {
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        date: row.date,
        readTime: row.read_time,
        categoryColor: row.category_color,
        heroImage: row.hero_image,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        content: {
          paragraphs: []
        }
      };

      // Parser les paragraphes
      if (row.paragraphs_json) {
        const paragraphs = row.paragraphs_json.split('|').map(p => {
          const para = JSON.parse(p);
          return {
            text: para.text,
            image: para.image.src ? {
              src: para.image.src,
              alt: para.image.alt || '',
              caption: para.image.caption || ''
            } : undefined
          };
        });
        actualite.content.paragraphs = paragraphs;
      }

      return actualite;
    });
  }

  // Récupérer une actualité par ID
  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT 
        a.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', ap.id,
            'text', ap.text,
            'image', JSON_OBJECT(
              'src', ap.image_src,
              'alt', ap.image_alt,
              'caption', ap.image_caption
            ),
            'displayOrder', ap.display_order
          ) ORDER BY ap.display_order
          SEPARATOR '|'
        ) as paragraphs_json
      FROM actualites a
      LEFT JOIN actualite_paragraphs ap ON a.id = ap.actualite_id
      WHERE a.id = ?
      GROUP BY a.id
    `, [id]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const actualite = {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      date: row.date,
      readTime: row.read_time,
      categoryColor: row.category_color,
      heroImage: row.hero_image,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      content: {
        paragraphs: []
      }
    };

    // Parser les paragraphes
    if (row.paragraphs_json) {
      const paragraphs = row.paragraphs_json.split('|').map(p => {
        const para = JSON.parse(p);
        return {
          text: para.text,
          image: para.image.src ? {
            src: para.image.src,
            alt: para.image.alt || '',
            caption: para.image.caption || ''
          } : undefined
        };
      });
      actualite.content.paragraphs = paragraphs;
    }

    return actualite;
  }

  // Créer une actualité
  static async create(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insérer l'actualité
      const [result] = await connection.execute(`
        INSERT INTO actualites 
        (title, excerpt, category, date, read_time, category_color, hero_image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        data.title,
        data.excerpt,
        data.category,
        data.date,
        data.readTime,
        data.categoryColor,
        data.heroImage
      ]);

      const actualiteId = result.insertId;

      // Insérer les paragraphes
      if (data.content && data.content.paragraphs) {
        for (let i = 0; i < data.content.paragraphs.length; i++) {
          const para = data.content.paragraphs[i];
          await connection.execute(`
            INSERT INTO actualite_paragraphs
            (actualite_id, text, image_src, image_alt, image_caption, display_order)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [
            actualiteId,
            para.text,
            para.image?.src || null,
            para.image?.alt || null,
            para.image?.caption || null,
            i
          ]);
        }
      }

      await connection.commit();
      return await this.findById(actualiteId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Mettre à jour une actualité
  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Mettre à jour l'actualité
      await connection.execute(`
        UPDATE actualites SET
          title = ?,
          excerpt = ?,
          category = ?,
          date = ?,
          read_time = ?,
          category_color = ?,
          hero_image = ?
        WHERE id = ?
      `, [
        data.title,
        data.excerpt,
        data.category,
        data.date,
        data.readTime,
        data.categoryColor,
        data.heroImage,
        id
      ]);

      // Supprimer les anciens paragraphes
      await connection.execute(`
        DELETE FROM actualite_paragraphs WHERE actualite_id = ?
      `, [id]);

      // Insérer les nouveaux paragraphes
      if (data.content && data.content.paragraphs) {
        for (let i = 0; i < data.content.paragraphs.length; i++) {
          const para = data.content.paragraphs[i];
          await connection.execute(`
            INSERT INTO actualite_paragraphs
            (actualite_id, text, image_src, image_alt, image_caption, display_order)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [
            id,
            para.text,
            para.image?.src || null,
            para.image?.alt || null,
            para.image?.caption || null,
            i
          ]);
        }
      }

      await connection.commit();
      return await this.findById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Supprimer une actualité
  static async delete(id) {
    await pool.execute('DELETE FROM actualites WHERE id = ?', [id]);
    return true;
  }
}

export default Actualite;
