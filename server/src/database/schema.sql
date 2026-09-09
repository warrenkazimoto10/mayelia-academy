-- Base de données pour Mayelia Academy
-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS mayelia_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mayelia_academy;

-- Table des actualités
CREATE TABLE IF NOT EXISTS actualites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(50) NOT NULL,
  read_time VARCHAR(20) NOT NULL,
  category_color VARCHAR(100) NOT NULL,
  hero_image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_date (date),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des paragraphes d'actualités
CREATE TABLE IF NOT EXISTS actualite_paragraphs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actualite_id INT NOT NULL,
  text TEXT NOT NULL,
  image_src VARCHAR(500),
  image_alt VARCHAR(255),
  image_caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (actualite_id) REFERENCES actualites(id) ON DELETE CASCADE,
  INDEX idx_actualite_id (actualite_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des conseils
CREATE TABLE IF NOT EXISTS conseils (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(50) NOT NULL,
  read_time VARCHAR(20) NOT NULL,
  category_color VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_date (date),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des paragraphes de conseils
CREATE TABLE IF NOT EXISTS conseil_paragraphs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conseil_id INT NOT NULL,
  text TEXT NOT NULL,
  image_src VARCHAR(500),
  image_alt VARCHAR(255),
  image_caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conseil_id) REFERENCES conseils(id) ON DELETE CASCADE,
  INDEX idx_conseil_id (conseil_id),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Domaines de formation (section Formations du site)
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

-- Programmes / formations par domaine
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

-- Administrateurs (connexion email / mot de passe)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
