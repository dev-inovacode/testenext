import {Types} from 'mongoose'
import dbConnect from '../dbConnect'
import Users from '../models/UsersSchemas'
import Pendencies from '../models/PendenciesSchemas'

export default async (request, response) => {
    dbConnect()

    const {id, pendency} = request.body

    let dt = new Date()
    dt.setHours(dt.getHours() - 3)
    let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
    let hr_reg = ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2)
    //para para deploy na vercel atraso de 3 horas
    
    const user = await Users.findOne({_id: id})

    const pendencyItem = await Pendencies.create({
        _id: new Types.ObjectId,
        responsible: {
            _id: user._id,
            name: user.name
        },
        pendency: pendency,
        date: dt_reg,
        hour: hr_reg,
        solved: false,
        s_date: '',
        s_hour: '',
        __v: 0
    })

    response.json(pendencyItem)
}