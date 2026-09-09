import pool from '../database/db.js';

class Conseil {
  // Récupérer tous les conseils
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT 
        c.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', cp.id,
            'text', cp.text,
            'image', JSON_OBJECT(
              'src', cp.image_src,
              'alt', cp.image_alt,
              'caption', cp.image_caption
            ),
            'displayOrder', cp.display_order
          ) ORDER BY cp.display_order
          SEPARATOR '|'
        ) as paragraphs_json
      FROM conseils c
      LEFT JOIN conseil_paragraphs cp ON c.id = cp.conseil_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

    return rows.map(row => {
      const conseil = {
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        date: row.date,
        readTime: row.read_time,
        categoryColor: row.category_color,
        image: row.image,
        content: row.content,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };

      // Parser les paragraphes si présents
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
        conseil.content = { paragraphs };
      }

      return conseil;
    });
  }

  // Récupérer un conseil par ID
  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT 
        c.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', cp.id,
            'text', cp.text,
            'image', JSON_OBJECT(
              'src', cp.image_src,
              'alt', cp.image_alt,
              'caption', cp.image_caption
            ),
            'displayOrder', cp.display_order
          ) ORDER BY cp.display_order
          SEPARATOR '|'
        ) as paragraphs_json
      FROM conseils c
      LEFT JOIN conseil_paragraphs cp ON c.id = cp.conseil_id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const conseil = {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      date: row.date,
      readTime: row.read_time,
      categoryColor: row.category_color,
      image: row.image,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    // Parser les paragraphes si présents
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
      conseil.content = { paragraphs };
    }

    return conseil;
  }

  // Créer un conseil
  static async create(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insérer le conseil
      const [result] = await connection.execute(`
        INSERT INTO conseils 
        (title, excerpt, category, date, read_time, category_color, image, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        data.title,
        data.excerpt,
        data.category,
        data.date,
        data.readTime,
        data.categoryColor,
        data.image || null,
        typeof data.content === 'string' ? data.content : null
      ]);

      const conseilId = result.insertId;

      // Insérer les paragraphes si présents
      if (data.content && data.content.paragraphs) {
        for (let i = 0; i < data.content.paragraphs.length; i++) {
          const para = data.content.paragraphs[i];
          await connection.execute(`
            INSERT INTO conseil_paragraphs
            (conseil_id, text, image_src, image_alt, image_caption, display_order)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [
            conseilId,
            para.text,
            para.image?.src || null,
            para.image?.alt || null,
            para.image?.caption || null,
            i
          ]);
        }
      }

      await connection.commit();
      return await this.findById(conseilId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Mettre à jour un conseil
  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Mettre à jour le conseil
      await connection.execute(`
        UPDATE conseils SET
          title = ?,
          excerpt = ?,
          category = ?,
          date = ?,
          read_time = ?,
          category_color = ?,
          image = ?,
          content = ?
        WHERE id = ?
      `, [
        data.title,
        data.excerpt,
        data.category,
        data.date,
        data.readTime,
        data.categoryColor,
        data.image || null,
        typeof data.content === 'string' ? data.content : null,
        id
      ]);

      // Supprimer les anciens paragraphes
      await connection.execute(`
        DELETE FROM conseil_paragraphs WHERE conseil_id = ?
      `, [id]);

      // Insérer les nouveaux paragraphes
      if (data.content && data.content.paragraphs) {
        for (let i = 0; i < data.content.paragraphs.length; i++) {
          const para = data.content.paragraphs[i];
          await connection.execute(`
            INSERT INTO conseil_paragraphs
            (conseil_id, text, image_src, image_alt, image_caption, display_order)
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

  // Supprimer un conseil
  static async delete(id) {
    await pool.execute('DELETE FROM conseils WHERE id = ?', [id]);
    return true;
  }
}

export default Conseil;
