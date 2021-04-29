import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
    dbConnect()

    const {userLogin, passLogin} = request.body
    
    const itemsList = await Users.findOne({username: userLogin, password: passLogin})
    
    response.json(itemsList)
  }