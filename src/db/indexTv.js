exports.addTv = async (tvObj, collection) => {
    try{
        await collection.insertOne(tvObj)
        console.log(`Successfully added ${tvObj.title}`)
    }catch (error) {
        console.log(error)
    }
}

exports.editTv = async (tvObj, newObj, collection) => {
    try{
        await collection.updateOne(tvObj, newObj)
        if (tvObj.title){
            console.log(`Successfully changed ${tvObj.title} to ${newObj.$set.title}`)
        }
        else if (tvObj.genre){
            console.log(`Successfully changed ${tvObj.genre} to ${newObj.$set.genre}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.deleteTv = async (tvObj, collection) => {
    try{
        await collection.deleteOne(tvObj)
        if (tvObj.title){
            console.log(`Successfully deleted ${tvObj.title}`)
        }
        else if (tvObj.genre){
            console.log(`Successfully deleted ${tvObj.genre}`)
        }
    }catch (error) {
        console.log(error)
    }
}

exports.listTv = async (collection) => {
    try{
        const fullList = await collection.find({})
        await fullList.forEach(element => {
            console.log(`title:${element.title} genre:${element.genre}`)
        });
    }catch (error) {
        console.log(error)
    }
}