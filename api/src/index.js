const express = require("express")
const cors = require("cors");
const GetAllRepositories = require("./domain/use-cases/GetAllRepositories");
const GetRepoByNameOrId = require("./domain/use-cases/GetRepoByNameOrId");
const PostgresDMBS = require("./infrastructure/DBMS/PostgresDBMS");
const RepositoryController = require("./interfaces/RepositoryController");
const FetchTrendingRepos = require("./domain/use-cases/FetchTrendingRepos");
const GithubGateway = require("./infrastructure/githubGateway/githubGateway");
const ForceSync = require("./domain/use-cases/ForceSync");
const SyncTimer = require("./utils/SyncTimer");
const pool = require('./infrastructure/db/db')
const repositoryDBMS = new PostgresDMBS();
const githubGateway = new GithubGateway();
const getAllRepos = new GetAllRepositories(repositoryDBMS);
const getRepo = new GetRepoByNameOrId(repositoryDBMS);
const fetchTrending = new FetchTrendingRepos(githubGateway, repositoryDBMS);
const syncTimer = new SyncTimer(5 * 60 * 1000, () => fetchTrending.execute());
const forceSync = new ForceSync(fetchTrending, syncTimer);


async function startApp() {
    let retries = 5;
    while (retries > 0) {
        try {
            await pool.query("SELECT 1");
            console.log("Database connected!");
            break;
        }
        catch (err) {
            console.log('Waiting for database...', err);
            retries--;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    const app = express();
    app.use(express.json());
    // Настройка CORS
    app.use(cors({
        origin: 'http://localhost:5173', 
    }));

    //Настройка контроллера
    syncTimer.start();
    const controller = new RepositoryController(getRepo, getAllRepos, forceSync);
    app.use('/', controller.router);

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
    })
}

startApp();

