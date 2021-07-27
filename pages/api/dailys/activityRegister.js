import {Types} from 'mongoose'
import dbConnect from '../dbConnect'
import Activitys from '../models/ActivitysSchemas'
import Users from '../models/UsersSchemas'

export default async (request, response) => {
    dbConnect()

    const {id, activity} = request.body

    try {
        const user = await Users.findOne({_id: id})

        let dt = new Date()
        dt.setHours(dt.getHours() - 3)
        let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
        let hr_reg = ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2)
        //para para deploy na vercel atraso de 3 horas

        const itemsList = await Activitys.create({
            _id: new Types.ObjectId,
            name: user.name,
            activity: activity,
            date: dt_reg,
            hour: hr_reg,
            __v: 0
        })

        response.json(itemsList)
    }catch{
        response.status(500).send('Something broke!')
    }
}