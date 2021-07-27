import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
  dbConnect()

  const {user} = request.query
  
  try {
    const item = await Users.findOne({_id: user})
    
    const userInfo = {
      _id: item._id,
      name: item.name,
      function: item.function,
      password: item.password,
      email: item.email,
      phone: item.phone,
      in_resolution: item.in_resolution,
      closed: item.closed
    }
      
    return response.json(userInfo)
  }catch {
    return response.status(501)
  }
  
}