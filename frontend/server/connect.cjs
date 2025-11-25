const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main() {
    console.log("Running connect...")
    const DB = process.env.ATLAS_URI

    const client = new MongoClient(DB)

    try {
        await client.connect()
        console.log("Connecting...")
        const collections = await client.db("tecademy_db").collections()
        console.log("Getting Collections...")

        collections.forEach((collection) => console.log(collection.s.namespace.collection))

    } catch(e) {
        console.log(e)
    } finally {
        await client.close()
    }


    
}

main()