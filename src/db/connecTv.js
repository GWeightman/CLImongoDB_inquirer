require("dotenv").config()
const { MongoClient } = require("mongodb")

const connection = async (crudFunc, tvObj) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const db = client.db("FavMedia")
        const collection = db.collection("TV")
        await crudFunc(tvObj, collection)
        client.close()
    } catch (error) {
        console.log(error)
    }
}

const connection2 = async (crudFunc, tvObj, newObj) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const db = client.db("FavMedia")
        const collection = db.collection("TV")
        await crudFunc(tvObj, newObj, collection)
        client.close()
    } catch (error) {
        console.log(error)
    }
}

const connection3 = async (crudFunc) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI)
        await client.connect()
        const db = client.db("FavMedia")
        const collection = db.collection("TV")
        await crudFunc(collection)
        client.close()
    } catch (error) {
        console.log(error)
    }
}


module.exports = { connection, connection2, connection3 }