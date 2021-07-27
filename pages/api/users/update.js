import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
    dbConnect()

    const req = request.body

    let dt = new Date()
    dt.setHours(dt.getHours() - 3)
    let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
    dt_reg += " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2)
    //para para deploy na vercel atraso de 3 horas

    const user = await Users.findByIdAndUpdate(
      req._id,
      {$set:{
        function: req.function,
        email: req.email,
        password: req.password,
        phone: req.phone
      }},
      {new: true}
    )
    
    return response.json(user)
  }