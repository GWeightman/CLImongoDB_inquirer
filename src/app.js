const inquirer = require("inquirer")
const Movies = require("./pages/movies")


const app = async () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "lists",
                message: `Which list would you like to enter`,
                choices: ["Movies", "TV", "Anime", "Game", "Books", "Graphic Novels"],
            },
        ])
        .then((answers) => {
            if (answers.lists == "Movies"){
                Movies()
            }
        })
}



app()