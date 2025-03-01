const Repository = require("../../domain/entities/Repository");
const pool = require("../db/db");

class PostgresDMBS {
    async findAll(){
        const result = await pool.query("SELECT * FROM repositories");
        const repos = result.rows.map(row => new Repository(row.id, row.name, row.stars, row.url));
        return repos.sort((a,b) => b.stars - a.stars);
    }

    async findByNameOrId(NameOrId){
        let result;
        console.log(NameOrId);
        if (isNaN(NameOrId)) {
            result = await pool.query("SELECT * FROM repositories WHERE name=$1", [NameOrId])
        }
        else {
            result = await pool.query("SELECT * FROM repositories WHERE id=$1", [NameOrId])
        }
        const resultRow = result.rows[0];
        return new Repository(resultRow.id, resultRow.name, resultRow.stars, resultRow.url);
    }

    async save(repo) {
        await pool.query("INSERT INTO repositories (name,stars,url) VALUES ($1,$2,$3)",
        [repo.name, repo.stars, repo.url]);
    }

    async updateStars(repo) {
        await pool.query("UPDATE repositories SET stars=$1 WHERE name=$2",
        [repo.stars, repo.name]);
    }
}

module.exports = PostgresDMBS;