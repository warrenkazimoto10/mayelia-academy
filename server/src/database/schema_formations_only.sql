-- À exécuter sur une base mayelia_academy existante si les tables formations manquent.
USE mayelia_academy;

CREATE TABLE IF NOT EXISTS formation_domaines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  icon_key VARCHAR(50) NOT NULL DEFAULT 'truck',
  color_tailwind VARCHAR(200) NOT NULL,
  gradient_tailwind VARCHAR(200) NOT NULL,
  image_url VARCHAR(800) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS formation_programmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  domaine_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  contenus_json JSON NOT NULL,
  objectifs_json JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (domaine_id) REFERENCES formation_domaines(id) ON DELETE CASCADE,
  INDEX idx_domaine (domaine_id),
  INDEX idx_sort_prog (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
