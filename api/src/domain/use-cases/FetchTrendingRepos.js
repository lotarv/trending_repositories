class FetchTrendingRepos {
    constructor(githubGateway, repositoryDBMS) {
        this.githubGateway = githubGateway;
        this.repositoryDBMS = repositoryDBMS;
    }

    async execute() {
        const trendingRepos = await this.githubGateway.fetchTrending();
        const existingRepos = await this.repositoryDBMS.findAll();
        const existingMap = existingRepos.reduce((acc, repo) => {
            acc[repo.name] = repo.stars;
            return acc;
        }, {})
        for (const repo of trendingRepos) {
            if (!existingMap[repo.name]) {
                await this.repositoryDBMS.save(repo);
            }
            else if (existingMap[repo.name] != repo.stars) {
                await this.repositoryDBMS.updateStars(repo);
            }
        }
        console.log("the data has been synchronized")
    }
}

module.exports = FetchTrendingRepos;