import dbConnect from '../dbConnect'
import Tags from '../models/TagsSchemas'

export default async (request, response) => {
    dbConnect()

    const itemsList = await Tags.find()
    
    response.json(itemsList)
  }