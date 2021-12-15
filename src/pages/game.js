const inquirer = require("inquirer")
const { connection, connection2, connection3 } = require("./../db/connecGame")
const { addGame, editGame, deleteGame, listGame } = require("./../db/indexGame")

const add = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Name of the Game?"
            },
            {
                type: "input",
                name: "charactor",
                message: "Who is the Main Charactor?"
            }
        ])
        .then(async (answers) => {
            const gameObj = {title: answers.title, charactor: answers.charactor}
            await connection(addGame, gameObj)
        })
        .then (() => Game())
}

const edit = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "edit",
                message: "What would you like to edit?",
                choices: ["Title", "Charactor"]
            }
        ])
        .then(async (answers) => {
            if (answers.edit == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the Game you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newtitle",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { title: answers.newtitle }}
                        const gameObj = { title: answers.title } 
                        await connection2(editGame, gameObj, newObj)
                    })
            }
            else if (answers.edit == "Charactor"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "charactor",
                            message: "What is the name of the main charactor you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newcharactor",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { charactor: answers.newcharactor }}
                        const gameObj = { charactor: answers.charactor } 
                        await connection2(editGame, gameObj, newObj)
                    })
            }
        })
        .then (() => Game())
}

const del = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "del",
                message: "Would you like to delete by Title or Charactor?",
                choices: ["Title", "Charactor"]
            }
        ])
        .then(async (answers) => {
            if (answers.del == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the Game you would like to delete?"
                        }
                    ])
                    .then(async (answers) => {
                        const gameObj = { title: answers.title } 
                        await connection(deleteGame, gameObj)
                    })
            }
            else if (answers.del == "Charactor"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "charactor",
                            message: "What is the name of the Charactor you would like to change?"
                        }
                    ])
                    .then(async (answers) => {
                        const gameObj = { charactor: answers.charactor } 
                        await connection(deleteGame, gameObj)
                    })
            }
        })
        .then (() => Game())
}

const view = async () => {
    await connection3(listGame)
    Game()
}

const Game = () => {
    inquirer
        .prompt ([
            {
                type: "list",
                name: "game",
                message: "What would you like to do in this list",
                choices: ["View List", "Add Entry", "Modify Entry", "Delete Entry", "Finished"]
            }
        ])
        .then ((answers) => {
            if (answers.game == "Add Entry") {
                add()
            }
            else if (answers.game == "Modify Entry") {
                edit()
            }
            else if (answers.game == "Delete Entry"){
                del()
            }
            else if (answers.game == "View List"){
                view()
            }
            else if (answers.game == "Finished"){
                return
            }
        })
    
}

module.exports = Game