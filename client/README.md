# CleanQuest

## Description:

Environmental littering is a significant issue in many communities, negatively impacting public spaces, wildlife, and local ecosystems. Despite the fact that many people are prepared to take part in environmental clean-ups, there is no centralised infrastructure that allows community members to locate litter hotspots, plan cleanup activities, and monitor their environmental contributions.

CleanQuest provides a platform that overcomes this issue by helping users identify areas affected by litter, coordinate clean-up efforts, and monitor the impact of their contributions. CleanQuest combines practical environmental tools with gamification features such as leaderboards, points, and progress tracking to encourage user engagement.

## Setup Instructions:

To set up CleanQuest follow these steps:

#### Step 1-

First clone the GitHub repository
`git clone https://github.com/carnicus871-png/cleanquest.git`.

#### Step 2-

Then navigate to the **frontend** of the project `cd client`, and install the dependencies using `npm install`.

These are the depencencies you will be installing from the frontend:

```
"@reduxjs/toolkit": "^2.12.0",
"leaflet": "^1.9.4",
"react": "^19.2.6",
"react-dom": "^19.2.6",
"react-leaflet": "^5.0.0",
"react-redux": "^9.3.0",
"react-router-dom": "^7.17.0"
"@eslint/js": "^10.0.1",
"@types/react": "^19.2.17",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^6.0.1",
"eslint": "^10.3.0",
"eslint-plugin-react-hooks": "^7.1.1",
"eslint-plugin-react-refresh": "^0.5.2",
"globals": "^17.6.0",
"typescript": "^6.0.3",
"vite": "^8.0.12",
"vitest": "^4.1.9"
```

#### Step 3-

Then navigate to the **backend** of the project `cd backend`, and install the backend dependencies using `npm install` again.

These are the depencecies you will be installing from the backend:

```
"bcrypt": "^6.0.0",
"cors": "^2.8.6",
"dotenv": "^17.4.2",
"express": "^5.2.1",
"jsonwebtoken": "^9.0.3",
"multer": "^2.2.0",
"mysql2": "^3.22.4",
"react-router-dom": "^7.17.0"
```

#### Step 4-

To allow the server in the backend to run, you will need navigate to the `backend` and into the database folder to create a `.env` file with the following information:

- backend server port `PORT=3001`
- Database settings:
  `DB_HOST=localhost
DB_USER='your own username'
DB_PASSWORD='your own password'
DB_NAME=cleanup_quest`
- JWT secret used for signing tokens:
  `JWT_SECRET=add_your_secret_here`.

#### Step 5-

Create the SQL `CleanupQuest.sql` database from the backend in a platform like DBeaver. After importing the database, make sure MySQL is running before starting the backend server.

## Running The App

To run the application, follow these steps:

#### Step 1-

First start the server. Make sure you navigate to the `backend` and into the `database` directory. Then in the terminal enter `node server.js`. If all the information in correct in your `.env` the server should run, otherwise refer to the error code in the console to correct any mistakes.

#### Step 2-

next open another terminal and navigate to the front end of the application into `client`. Here enter `npm run dev` to start the application. Open the URL in your web browser to see the application.

#### Step 3-

To start using CleanQuest create an account by selecting **sign up**. Once you sign up, you can **log in** with your email and password to begin exploring CleanQuest!

## Team Member Contributions:

### Sarah Hull-

- Built the backend authentication system, including JWT-based login, bcrypt, password hashing, and the MySQL auth routes (signup, login, current user).
- Created the ProtectedRoute component to guard authenticated pages.
- Built the usePersistAuth hook to keep users logged in across page refreshes.
- Built the Redux auth slice to manage global authentication state and session persistence across the app.
- Built the Login, Signup pages.
- Built the Home dashboard and Profile pages in collaboration with Ria.
- Extracted reusable custom hooks (useLeaderboard, useHotspots) and shared components (Card, WelcomeCard, EcoLevelCard, ProfileHeader and others) to refactor the Homepage and ProfilePage.
- Set up Vitest and wrote unit tests for the auth slice, location slice, getHotspotsData, and validation for sign up and login.
- Debugged issues across the frontend, backend, routing, database, and API.

### Rose Day-

- Created the map page component to provide the main interface.
- Created the map component using Leaflet and OpenStreetMap.
- Styled the map page component using CSS modules.
- Set up navigation from the map page to the report form.
- Added severity levels and litter type fields to hotspot reports.
- Added marker filtering functionality on the map.
- Updated the database structure by creating the hotspots table.
- Created hotspot listing functionality.
- Implemented Redux for global state management and created location slices.

### Ria Raza-

- Participated in styling of the Homepage, Profile page and leaderboard page.
- Designed and implemented the navigation bar to improve usability and streamline navigation to different pages of the app.
- Developed a progress bar to provide visual user feedback and support gamification features.
- Created the leveling-up system in the front-end to track user achievement and encourage engagement.
- Cleared up backend database of unused tables to maintain database hygiene.
- Collaborated to resolve merge conflicts.
- Completed the readme file with the description of CleanQuest, set-up instructions, and instructions on how to run the app.

### Natasha Gaffney-

- Developed the Leaderboard feature using React components.
- Built reusable components including the Leaderboard page, LeaderboardList, and LeaderboardRow.
- Integrated the frontend with the Express backend to retrieve leaderboard data from the MySQL database.
- Implemented API data fetching using `fetch()`, `useEffect`, and `useState`.
- Displayed and sorted users dynamically based on their points.
- Assisted with integrating React Router for navigation.
- Began migrating the leaderboard feature from JavaScript to TypeScript by creating types and adding type
  annotations.
- Debugged frontend, backend, routing, and API integration
  issues.
- Collaborated with the team using Git and GitHub, including resolving merge conflicts and integrating changes from the main branch.

### Caroline Karanja-

- Implemented image upload functionality for hotspot reports using Multer.
- Updated the hotspot reporting form to support image uploads using FormData.
- Modified the backend to store uploaded images and save image references in the database.
- Updated the map page to display uploaded hotspot images.
- Added static file serving for uploaded images and installed the required project dependencies.
- Assisted with frontend improvements and testing of the image upload feature.

### Andrina Nisbet-

- Developed the Report Hotspot feature, allowing users to submit litter hotspot reports through a dedicated form.
- Implemented form validation to ensure required information is provided before submission.
- Integrated Redux state management to automatically populate user and location information within hotspot reports.
- Added automatic location handling and address population using selected map coordinates.
- Implemented hotspot submission functionality and success/error handling.
- Enhanced the user experience through improved form design, styling, and user feedback.
- Contributed to application routing and navigation between pages.
- Assisted with debugging, testing, code reviews, and resolving merge conflicts during feature integration.
- Collaborated with team members using Git and GitHub throughout the development process.
