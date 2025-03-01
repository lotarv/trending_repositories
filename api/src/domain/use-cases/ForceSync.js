class ForceSync {
    constructor(fetchTrendingRepos, syncTimer) {
        this.fetchTrendingRepos = fetchTrendingRepos;
        this.syncTimer = syncTimer;
    }

    async execute() {
        await this.fetchTrendingRepos.execute();
        this.syncTimer.reset();
    }
}

module.exports = ForceSync;