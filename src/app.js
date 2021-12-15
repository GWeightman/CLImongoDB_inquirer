const inquirer = require("inquirer")
const Movies = require("./pages/movies")
const TV = require("./pages/tv")
const Game = require("./pages/game")


const app = async () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "lists",
                message: `Which list would you like to enter`,
                choices: ["Movies", "TV", "Game", "Books", "Graphic Novels"],
            },
        ])
        .then((answers) => {
            if (answers.lists == "Movies"){
                Movies()
            }
            else if (answers.lists == "TV") {
                TV()
            }
            else if (answers.lists == "Game") {
                Game()
            }
        })
}



app()
