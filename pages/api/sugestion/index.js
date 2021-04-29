import {Types} from 'mongoose'
import dbConnect from '../dbConnect'
import Questions from '../models/QuestionsSchemas'

export default async (request, response) => {
    dbConnect()

    const {sugestion} = request.body

    let dt = new Date()
    dt.setHours(dt.getHours() - 3)
    let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
    dt_reg += " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2)
    //para para deploy na vercel atraso de 3 horas

    const itemsList = await Questions.create({
        _id: new Types.ObjectId,
        answer: '',
        number: 'BO',
        question: sugestion,
        group: 'BO',
        date: dt_reg,
        type: 'SUGESTAO',
        __v: 0
    })

    response.json(itemsList)
}