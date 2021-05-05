import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
  dbConnect()

  const {userLogin, passLogin} = request.body
  
  const item = await Users.findOne({username: userLogin, password: passLogin})

  const user = {_id: item._id, username: item.username}
  
  response.json(user)
}