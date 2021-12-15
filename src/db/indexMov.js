exports.addMovie = async (movieObj, collection) => {
    try{
        await collection.insertOne(movieObj)
        console.log(`Successfully added ${movieObj.title}`)
    }catch (error) {
        console.log(error)
    }
}

exports.editMovie = async (movieObj, newObj, collection) => {
    try{
        await collection.updateOne(movieObj, newObj)
        if (movieObj.actor){
            console.log(`Successfully changed ${movieObj.actor} to ${newObj.$set.actor}`)
        }
        else if (movieObj.title){
            console.log(`Successfully changed ${movieObj.title} to ${newObj.$set.title}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.deleteMovie = async (movieObj, collection) => {
    try{
        await collection.deleteOne(movieObj)
        if (movieObj.actor){
            console.log(`Successfully deleted ${movieObj.actor}`)
        }
        else if (movieObj.title){
            console.log(`Successfully deleted ${movieObj.title}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.listMovie = async (collection) => {
    try{
        const fullList = await collection.find({})
        await fullList.forEach(element => {
            console.log(`title:${element.title} actor:${element.actor}`)
        });
    }catch (error) {
        console.log(error)
    }
}