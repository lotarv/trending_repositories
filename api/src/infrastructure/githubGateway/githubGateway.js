const axios = require("axios");
const Repository = require("../../domain/entities/Repository")
class GithubGateway {
    async fetchTrending() {
        const reposPerPage = 100;
        const repos = [];
        for (let cur_page = 1; cur_page <= 5; cur_page++) {
            const response = await axios.get("https://api.github.com/search/repositories", {
                params: {
                    q: "stars:>10000",
                    sort: "stars",
                    order: "desc",
                    page: cur_page,
                    per_page: reposPerPage
                }
            })

            const pageRepos = response.data.items.map(repo =>
                new Repository(repo.id, repo.name, repo.stargazers_count, repo.html_url)
            );
            repos.push(...pageRepos);
        }
        return repos;
    }
}

module.exports = GithubGateway;