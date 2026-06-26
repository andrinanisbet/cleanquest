# CleanQuest

## Description:
 Environmental littering is a significant issue in many communities, negatively impacting public spaces, wildlife, and local ecosystems. Despite the fact that many people are prepared to take part in environmental clean-ups, there is no centralised infrastructure that allows community members to locate litter hotspots, plan cleanup activities, and monitor their environmental contributions.

 CleanQuest provides a platform that overcomes this issue by helping users identify areas affected by litter, coordinate clean-up efforts, and monitor the impact of their contributions. CleanQuest combines practical environmental tools with gamification features such as leaderboards, points, and progress tracking to encourage user engagement.

## Setup Instructions:
To set up CleanQuest follow these steps:

#### Step 1-
First clone the GitHub repository
`git clone`.

#### Step 2- 
Then navigate to the **frontend** of the project `cd client`, and install the dependencies using `np install`.

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
"vite": "^8.0.12"
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
Create the SQL `CleanupQuest.sql` database from the backend in a platform like DBeaver.

## Running The App
To run the application, follow these steps:

#### Step 1-
First start the server. Make sure you navigate to the `backend` and into the `database` directory. Then in the terminal enter `node server.js`. If all the information in correct in your `.env` the server should run, otherwise refer to the error code in the console to correct any mistakes.

#### Step 2-
next open another terminal and navigate to the front end of the application into `client`. Here enter `npm run dev` to start the application. Open the URL in your web browser to see the application. 

#### Step 3- 
To start using CleanQuest create an account by selecting **sign up**. Once you sign up, you can **log in** with your email and password to begin exploring CleanQuest!


## Team Member Contributions:
Sarah Hull-

Rose Day-

Ria Raza-

Natasha Gaffney-
>
### Contribution to the Cleanup Quest Project
>
* Developed the Leaderboard feature using React components.
>
* Built reusable components including the Leaderboard page, LeaderboardList, and LeaderboardRow.
>
* Integrated the frontend with the Express backend to retrieve leaderboard data from the MySQL database.
>
* Implemented API data fetching using `fetch()`, `useEffect`, and `useState`.
>
* Displayed and sorted users dynamically based on their points.
>
* Assisted with integrating React Router for navigation.
>
* Began migrating the leaderboard feature from JavaScript to TypeScript by creating types and adding type 
annotations.
>
* Debugged frontend, backend, routing, and API integration 
issues.
>
* Collaborated with the team using Git and GitHub, including resolving merge conflicts and integrating changes from the main branch.


Caroline Karanja-

Andrina Nisbet-
