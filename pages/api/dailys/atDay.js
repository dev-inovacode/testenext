import dbConnect from '../dbConnect'
import Activitys from '../models/ActivitysSchemas'

export default async (request, response) => {
    dbConnect()

    let dt = new Date()
    dt.setHours(dt.getHours() - 3)
    let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()

    const itemsList = await Activitys.find({date: dt_reg})

    response.json(itemsList)
}