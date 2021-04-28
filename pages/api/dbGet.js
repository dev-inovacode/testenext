import {MongoClient} from 'mongodb'
import url from 'url'

let cacheDb = null

async function connectDatabase(uri) {
  if(cacheDb) {
    return cacheDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = url.parse(uri).pathname.substr(1)

  const db = client.db(dbName)

  cacheDb = db

  return db
}

export default async (request, response) => {
  const db = await connectDatabase(process.env.MONGO_URL)

  const collection = db.collection('questionsschemas')

  const itemsList = await collection.find({})

  response.json(itemsList)
}
