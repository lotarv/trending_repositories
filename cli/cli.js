#!/usr/bin/env node
const {program} = require('commander')
const axios = require('axios');

const API_URL = 'http:/localhost:3000';

//Command: get all repositories
program 
    .command('list')
    .description('Get all trending repositories')
    .action(async () => {
        try {
            const response = await axios.get(`${API_URL}/repositories`);
            const repos = response.data;
            if (repos.length == 0) {
                console.log("No repositories found");
            }
            else {
                let position = 1;
                repos.forEach(repo => {
                    console.log(`${position++}. Name: ${repo.name}, Stars: ${repo.stars}, URL: ${repo.url}`);
                })
            }
        }
        catch(err) {
            console.error("Error fetching repositories: ", err.message)
        }
    });
//Command: get repository by name or id
program
    .command('get <nameOrId>')
    .description("Get repository by ID or name")
    .action (async (idOrName) => {
        try {
            const response = await axios.get(`${API_URL}/repositories/${idOrName}`);
            const repo = response.data;
            if (!repo) {
                console.log("Repository not found");
            }
            else {
                console.log(`Name: ${repo.name}, Stars: ${repo.stars}, Url: ${repo.url}`)
            }
        }
        catch (err) {
            console.error("Error while getting repository: ", err)
        }
    });

//Command: start synchronization

program
    .command('sync')
    .description('Start sync with Github')
    .action(async () => {
        try {
            const response = await axios.post(`${API_URL}/sync`)
            console.log(response.data);
        }
        catch(err) {
            console.error("Error while syncronization: ", err)
        }
    });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}