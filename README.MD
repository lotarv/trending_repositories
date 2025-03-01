# Trending Repos (Test task for JetRuby)

## Description
The project contains API (Node.js), CLI and SPA (React + Vite) to work with API

## Structure
- `api/` - back-end (Node.js).
- `cli/` - command-line interface (Node.js).
- `spa/` - front-end (React с Vite).

## Necessary components
- Docker and Docker Compose installed on your system.
- Node.js (optional, for running CLI locally).

## Setup and Running
1. Clone this repository:
    ```bash
    git clone <http://github.com/lotarv/trending_repos>
    cd trending_repos
    ```
2. Start the application with Docker
    ```bash
    docker-compose up --build
    ```
3. Access the components:
    - **SPA(Frontend)**: Open http://localhost:5173 in your browser
    - **API**: Available at http://localhost:3000
    - **CLI**: Run commands from the cli/ directory (see below)

To stop the application:
```bash
    docker-compose down
``` 

## CLI Usage

- List all repositories:
    ```bash
        node cli.js list 
    ```
- Get a repository by name or id:
    ```bash
        node cli.js get <id-or-name> 
    ```
- Force sync with GitHub:
    ```bash
        node cli.js sync
    ```
## Database

- The project uses PostgreSQL, initialized with the schema in init-db.sql
- Data is stored in a pgdata volume managed by Docker Compose

## Notes

- The API fetches trending repositories every few minutes using setInterval

- All components are containerized for reproducibility.