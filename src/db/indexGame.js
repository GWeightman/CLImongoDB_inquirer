exports.addGame = async (gameObj, collection) => {
    try{
        await collection.insertOne(gameObj)
        console.log(`Successfully added ${gameObj.title}`)
    }catch (error) {
        console.log(error)
    }
}

exports.editGame = async (gameObj, newObj, collection) => {
    try{
        await collection.updateOne(gameObj, newObj)
        if (gameObj.title){
            console.log(`Successfully changed ${gameObj.title} to ${newObj.$set.title}`)
        }
        else if (gameObj.charactor){
            console.log(`Successfully changed ${gameObj.charactor} to ${newObj.$set.charactor}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.deleteGame = async (gameObj, collection) => {
    try{
        await collection.deleteOne(gameObj)
        if (gameObj.title){
            console.log(`Successfully deleted ${gameObj.title}`)
        }
        else if (gameObj.charactor){
            console.log(`Successfully deleted ${gameObj.charactor}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.listGame = async (collection) => {
    try{
        const fullList = await collection.find({})
        await fullList.forEach(element => {
            console.log(`title:${element.title} charactor:${element.charactor}`)
        });
    }catch (error) {
        console.log(error)
    }
}