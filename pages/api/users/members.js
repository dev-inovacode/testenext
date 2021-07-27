import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
  dbConnect()
  
  const itemsList = await Users.find()

  const usersList = itemsList.map((item) => {
    return {
        _id: item._id,
        foto: item.foto,
        name: item.name,
        function: item.function
    }
  })
  
  response.json(usersList)
}