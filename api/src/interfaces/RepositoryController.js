const express = require("express");
class RepositoryController {
    constructor(getRepoUseCase, getAllReposUseCase, forceSyncUseCase){
        this.getRepoUseCase = getRepoUseCase;
        this.getAllReposUseCase = getAllReposUseCase;
        this.forceSyncUseCase = forceSyncUseCase;
        this.router = express.Router();
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.get('/repositories', (req, res) => this.getAllRepos(req, res));
        this.router.get('/repositories/:nameOrId', (req, res) => this.getRepoByNameOrId(req, res));
        this.router.post('/sync', (req,res) => this.sync(req,res))
    }

    async getAllRepos(req, res) {
        try {
            const result = await this.getAllReposUseCase.execute();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({message: "Error while getting all repos"});
        }
    }

    async getRepoByNameOrId(req, res) {
        const nameOrId = req.params.nameOrId;
        let result;
        try {
            result = await this.getRepoUseCase.execute(nameOrId);
            if (!result) res.status(404).json({message: "Repository not found"})
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({message: "Error while getting single repo"});
        }
    }

    async sync(req, res) {
        try {
            await this.forceSyncUseCase.execute()
            res.status(200).json({message: "Synchronization successfull"});
        }
        catch(error) {
            console.error("Error while sync: ", error);
            res.status(500).json({message: "Error while synchronizing with github"});
        }
    }
}

module.exports = RepositoryController;