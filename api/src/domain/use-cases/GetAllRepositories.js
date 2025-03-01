
class GetAllRepositories {
    constructor(repositoryDBMS) {
        this.repositoryDBMS = repositoryDBMS;
    }

    async execute(){
        return this.repositoryDBMS.findAll();
    }
}

module.exports = GetAllRepositories;