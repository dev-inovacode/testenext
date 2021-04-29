import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
    dbConnect()

    const itemsList = await Users.find()
    
    response.json(itemsList)
  }