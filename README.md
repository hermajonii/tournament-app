# Beach volleyball tournament app

A web application for managing tournaments — registering teams, entering match results, and displaying the standings. 

## About The Project

This project is a small SPA (single-page application) built in React for handling basic tournament operations.  
Frontend is deployed on GitHub Pages: [https://hermajonii.github.io/tournament-app/](https://hermajonii.github.io/tournament-app/)  
Backend API is hosted on Render: [https://tournament-backend-app.onrender.com/](https://tournament-backend-app.onrender.com/)

Key functionalities:

- Register teams
- List all registered teams
- Enter match results
- Display results
- Change players
- Preloaded data is served from the backend
- Client-side routing via React Router (BrowserRouter)

Roles and Permissions
Basic:
 - Can register, list the teams, list the results.

Admin:
 - Can enter match results, change players.

### Built With
- **React** – Frontend UI  
- **React Router DOM** – Client-side navigation  
- **Node.js + Express backend** – Mock backend for local development  
- **GitHub Pages** – Deployment solution  
- **Bootstrap / Custom CSS** – Styling (if used — remove if not)  

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/hermajonii/tournament-app.git
   ```
2. Install NPM packages
   ```sh
   cd tournament-app
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes 
   ```
4. Run your application: 
   ```sh
   npm run dev 
   ```
   Application will be available at [https://localhost:3000](https://localhost:3000).

