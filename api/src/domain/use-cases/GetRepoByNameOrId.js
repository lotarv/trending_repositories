class GetRepoByNameOrId {
    constructor(repositoryDBMS) {
        this.repositoryDBMS = repositoryDBMS;
    }

    async execute(NameOrId) {
        return this.repositoryDBMS.findByNameOrId(NameOrId);
    }
}

module.exports = GetRepoByNameOrId;