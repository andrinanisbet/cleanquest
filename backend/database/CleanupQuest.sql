CREATE DATABASE IF NOT EXISTS cleanup_quest;

USE cleanup_quest;

CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	points INT DEFAULT 0,
	streak INT DEFAULT 0,
	last_cleanup_date DATE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

CREATE TABLE cleanups (
	cleanup_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	description TEXT,
	image_url VARCHAR(255),
	latitude DECIMAL(10,8),
	longitude DECIMAL(11,8),
	points_earned INT DEFAULT 0,
	cleanup_date DATE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (user_id)
	REFERENCES users(user_id)
	ON DELETE CASCADE 
	);
	
	INSERT INTO users
(username, email, password_hash, points, streak, last_cleanup_date)
VALUES
('Tasha', 'tasha@example.com', 'hashedpassword1', 350, 7, '2026-06-02'),
('Alex', 'alex@example.com', 'hashedpassword2', 280, 4, '2026-06-01'),
('Sam', 'sam@example.com', 'hashedpassword3', 180, 2, '2026-05-31'),
('Mia', 'mia@example.com', 'hashedpassword4', 420, 12, '2026-06-02'),
('Jake', 'jake@example.com', 'hashedpassword5', 120, 1, '2026-06-02');
	

INSERT INTO cleanups
(user_id, description, image_url, latitude, longitude, points_earned, cleanup_date)
VALUES
(1, 'Collected litter from local park', 'park_cleanup.jpg', 53.193392, -2.893075, 50, '2026-06-02'),
(1, 'Cleaned canal towpath', 'canal_cleanup.jpg', 53.192000, -2.890000, 30, '2026-06-01'),

(2, 'Beach cleanup event', 'beach_cleanup.jpg', 53.410000, -3.020000, 60, '2026-06-01'),

(3, 'Picked up rubbish around school grounds', 'school_cleanup.jpg', 53.250000, -2.900000, 40, '2026-05-31'),

(4, 'Community park cleanup', 'community_cleanup.jpg', 53.200000, -2.880000, 70, '2026-06-02'),

(5, 'Removed litter from riverside path', 'river_cleanup.jpg', 53.220000, -2.910000, 25, '2026-06-02');


SELECT username, points
FROM users
ORDER BY points DESC;


CREATE TABLE hotspots (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR (100),
lat DOUBLE,
lng DOUBLE,
description TEXT,
litter_type VARCHAR(100),
severity VARCHAR(20),
status VARCHAR (20) DEFAULT 'To be cleaned',
address VARCHAR (255),
image VARCHAR(255)
);

SHOW TABLES;


