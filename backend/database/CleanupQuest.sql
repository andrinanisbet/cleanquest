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
	
CREATE TABLE events (
	event_id INT AUTO_INCREMENT PRIMARY KEY,
	event_name VARCHAR(100) NOT NULL,
	description TEXT,
	location VARCHAR(255),
	event_date DATETIME NOT NULL,
	organiser_id INT,
	status ENUM('Upcoming', 'Completed', 'Cancelled') DEFAULT 'Upcoming',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (organiser_id)
	REFERENCES users(user_id)
	ON DELETE SET NULL 
	);
	
	
CREATE TABLE event_participants (
	event_id INT,
	user_id INT,
	joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY (event_id, user_id),
	
	FOREIGN KEY (event_id)
	REFERENCES events(event_id)
	ON DELETE CASCADE, 
	
	FOREIGN KEY (user_id)
	REFERENCES users(user_id)
	ON DELETE CASCADE
	);
	
	
CREATE TABLE badges (
	badge_id INT AUTO_INCREMENT PRIMARY KEY,
	badge_name VARCHAR(100) NOT NULL,
	description TEXT,
	badge_image VARCHAR(255)
	);

CREATE TABLE user_badges (
	user_id INT NOT NULL,
	badge_id INT NOT NULL,
	awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY (user_id, badge_id),
	
	FOREIGN KEY (user_id)
	REFERENCES users(user_id)
	ON DELETE CASCADE,
	
	FOREIGN KEY (badge_id)
	REFERENCES badges(badge_id)
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

INSERT INTO events
(event_name, description, location, event_date, organiser_id)
VALUES
(
    'Community Park Cleanup',
    'Join local volunteers to clean the community park.',
    'Chester Community Park',
    '2026-06-15 10:00:00',
    1
),
(
    'River Dee Cleanup',
    'Help remove litter from the riverbank.',
    'River Dee, Chester',
    '2026-06-22 09:30:00',
    4
),
(
    'Summer Beach Cleanup',
    'Large community beach cleanup event.',
    'West Kirby Beach',
    '2026-07-05 11:00:00',
    2
);

INSERT INTO event_participants
(event_id, user_id)
VALUES
(1, 1),
(1, 2),
(1, 3),

(2, 1),
(2, 4),
(2, 5),

(3, 2),
(3, 3),
(3, 4),
(3, 5);

INSERT INTO badges
(badge_name, description, badge_image)
VALUES
(
    'First Cleanup',
    'Completed your first cleanup.',
    'first_cleanup.png'
),
(
    '7 Day Streak',
    'Completed cleanups for seven consecutive days.',
    'streak_7.png'
),
(
    'Event Hero',
    'Attended your first community cleanup event.',
    'event_hero.png'
),
(
    '100 Points',
    'Earned 100 points.',
    '100_points.png'
),
(
    'Eco Champion',
    'Earned over 300 points.',
    'eco_champion.png'
);

INSERT INTO user_badges
(user_id, badge_id)
VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 5),

(2, 1),
(2, 4),

(3, 1),

(4, 1),
(4, 2),
(4, 4),
(4, 5),

(5, 1);

SELECT username, points
FROM users
ORDER BY points DESC;

SELECT event_name, location, event_date
FROM events
ORDER BY event_date;

SELECT
    u.username,
    b.badge_name
FROM user_badges ub
JOIN users u ON ub.user_id = u.user_id
JOIN badges b ON ub.badge_id = b.badge_id
ORDER BY u.username;