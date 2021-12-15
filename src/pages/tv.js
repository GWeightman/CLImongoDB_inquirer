const inquirer = require("inquirer")
const { connection, connection2, connection3 } = require("./../db/connecTv")
const { addTv, editTv, deleteTv, listTv } = require("./../db/indexTv")

const add = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Name of the TV series?"
            },
            {
                type: "input",
                name: "genre",
                message: "Type of Genre?"
            }
        ])
        .then(async (answers) => {
            const tvObj = {title: answers.title, genre: answers.genre}
            await connection(addTv, tvObj)
        })
        .then (() => TV())
}

const edit = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "edit",
                message: "What would you like to edit?",
                choices: ["Title", "Genre"]
            }
        ])
        .then(async (answers) => {
            if (answers.edit == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the TV series you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newtitle",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { title: answers.newtitle }}
                        const tvObj = { title: answers.title } 
                        await connection2(editTv, tvObj, newObj)
                    })
            }
            else if (answers.edit == "Genre"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "genre",
                            message: "What is the name of the Actor you would like to change?"
                        },
                        {
                            type: "input",
                            name: "newgenre",
                            message: "What would you like to change it to?"
                        }
                    ])
                    .then(async (answers) => {
                        const newObj = {$set: { genre: answers.newgenre }}
                        const tvObj = { genre: answers.genre } 
                        await connection2(editTv, tvObj, newObj)
                    })
            }
        })
        .then (() => TV())
}

const del = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "del",
                message: "Would you like to delete by Title or Genre?",
                choices: ["Title", "Genre"]
            }
        ])
        .then(async (answers) => {
            if (answers.del == "Title"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "What is the TV series you would like to delete?"
                        }
                    ])
                    .then(async (answers) => {
                        const tvObj = { title: answers.title } 
                        await connection(deleteTv, tvObj)
                    })
            }
            else if (answers.del == "Genre"){
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "genre",
                            message: "What is the Genre you would like to change?"
                        }
                    ])
                    .then(async (answers) => {
                        const tvObj = { genre: answers.genre } 
                        await connection(deleteTv, tvObj)
                    })
            }
        })
        .then (() => TV())
}

const view = async () => {
    await connection3(listTv)
    TV()
}

const TV = () => {
    inquirer
        .prompt ([
            {
                type: "list",
                name: "tv",
                message: "What would you like to do in this list",
                choices: ["View List", "Add Entry", "Modify Entry", "Delete Entry", "Finished"]
            }
        ])
        .then ((answers) => {
            if (answers.tv == "Add Entry") {
                add()
            }
            else if (answers.tv == "Modify Entry") {
                edit()
            }
            else if (answers.tv == "Delete Entry"){
                del()
            }
            else if (answers.tv == "View List"){
                view()
            }
            else if (answers.tv == "Finished"){
                return
            }
        })
    
}

module.exports = TV