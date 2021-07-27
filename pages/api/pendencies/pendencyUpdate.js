import {Types} from 'mongoose'
import dbConnect from '../dbConnect'
import Pendencies from '../models/PendenciesSchemas'

export default async (request, response) => {
    dbConnect()

    const {pendencyId} = request.body

    let dt = new Date()
    dt.setHours(dt.getHours() - 3)
    let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
    let hr_reg = ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2)
    //para para deploy na vercel atraso de 3 horas
    
    const pendencyItem = await Pendencies.findByIdAndUpdate(
        pendencyId,
        {$set:{
            solved: true,
            s_date: dt_reg,
            s_hour: hr_reg
        }},
        {new: true}
    )

    response.json(pendencyItem)
}