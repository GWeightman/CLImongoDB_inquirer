const inquirer = require("inquirer")
const { connection, connection2, connection3 } = require("./../db/connecMov")
const { addMovie, editMovie, deleteMovie, listMovie } = require("./../db/indexMov")

const add = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Name of the Movie?"
            },
            {
                type: "input",
                name: "actor",
                message: "Name of the Actor?"
            }
        ])
        .then(async (answers) => {
            const movieObj = {title: answers.title, actor: answers.actor}
            await connection(addMovie, movieObj)
        })
        .then (() => Movies())
}

const edit = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "edit",
                message: "What would you like to edit?",
                choices: ["Title", "Actor"]
            }
        ])
        .then(async (answers) => {
            if (answers.edit == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the Movie you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newtitle",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { title: answers.newtitle }}
                        const movieObj = { title: answers.title } 
                        await connection2(editMovie, movieObj, newObj)
                    })
            }
            else if (answers.edit == "Actor"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "actor",
                            message: "What is the name of the Actor you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newactor",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { actor: answers.newactor }}
                        const movieObj = { actor: answers.actor } 
                        await connection2(editMovie, movieObj, newObj)
                    })
            }
        })
        .then (() => Movies())
}

const del = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "del",
                message: "Would you like to delete by Title or Actor?",
                choices: ["Title", "Actor"]
            }
        ])
        .then(async (answers) => {
            if (answers.del == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the Movie you would like to delete?"
                        }
                    ])
                    .then(async (answers) => {
                        const movieObj = { title: answers.title } 
                        await connection(deleteMovie, movieObj)
                    })
            }
            else if (answers.del == "Actor"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "actor",
                            message: "What is the name of the Actor you would like to change?"
                        }
                    ])
                    .then(async (answers) => {
                        const movieObj = { actor: answers.actor } 
                        await connection(deleteMovie, movieObj)
                    })
            }
        })
        .then (() => Movies())
}

const view = async () => {
    await connection3(listMovie)
    Movies()
}

const Movies = () => {
    inquirer
        .prompt ([
            {
                type: "list",
                name: "movie",
                message: "What would you like to do in this list",
                choices: ["View List", "Add Entry", "Modify Entry", "Delete Entry", "Finished"]
            }
        ])
        .then ((answers) => {
            if (answers.movie == "Add Entry") {
                add()
            }
            else if (answers.movie == "Modify Entry") {
                edit()
            }
            else if (answers.movie == "Delete Entry"){
                del()
            }
            else if (answers.movie == "View List"){
                view()
            }
            else if (answers.movie == "Finished"){
                return
            }
        })
    
}

module.exports = Movies