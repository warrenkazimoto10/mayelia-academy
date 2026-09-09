import pool from '../database/db.js';

function parseJson(val, fallback = []) {
  if (val == null) return fallback;
  if (Array.isArray(val)) return val;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

class FormationDomain {
  static async findAll() {
    const [domains] = await pool.execute(
      `SELECT * FROM formation_domaines ORDER BY sort_order ASC, id ASC`
    );

    const result = [];
    for (const d of domains) {
      const [progs] = await pool.execute(
        `SELECT * FROM formation_programmes WHERE domaine_id = ? ORDER BY sort_order ASC, id ASC`,
        [d.id]
      );

      result.push({
        id: d.slug,
        title: d.title,
        iconKey: d.icon_key,
        color: d.color_tailwind,
        gradient: d.gradient_tailwind,
        image: d.image_url,
        formations: progs.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          contenus: parseJson(p.contenus_json, []),
          objectifs: parseJson(p.objectifs_json, [])
        }))
      });
    }

    return { domaines: result };
  }

  static async replaceAll(payload) {
    const domaines = payload?.domaines;
    if (!Array.isArray(domaines)) {
      throw new Error('Payload invalide : domaines[] requis');
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute('DELETE FROM formation_programmes');
      await conn.execute('DELETE FROM formation_domaines');

      let sortD = 0;
      for (const d of domaines) {
        const slug = d.id || d.slug;
        if (!slug || !d.title) {
          throw new Error('Chaque domaine doit avoir id (slug) et title');
        }

        const [ins] = await conn.execute(
          `INSERT INTO formation_domaines 
          (slug, title, icon_key, color_tailwind, gradient_tailwind, image_url, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            slug,
            d.title,
            d.iconKey || d.icon_key || 'truck',
            d.color || d.color_tailwind || 'from-primary to-secondary',
            d.gradient || d.gradient_tailwind || 'from-primary/10 to-secondary/10',
            d.image || d.image_url || '',
            sortD++
          ]
        );

        const domaineId = ins.insertId;
        const formations = d.formations || [];
        let sortP = 0;
        for (const f of formations) {
          await conn.execute(
            `INSERT INTO formation_programmes 
            (domaine_id, title, description, contenus_json, objectifs_json, sort_order)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
              domaineId,
              f.title,
              f.description || '',
              JSON.stringify(f.contenus || []),
              JSON.stringify(f.objectifs || []),
              sortP++
            ]
          );
        }
      }

      await conn.commit();
      return await this.findAll();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }
}

export default FormationDomain;
