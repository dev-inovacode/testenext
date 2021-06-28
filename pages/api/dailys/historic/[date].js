import dbConnect from '../../dbConnect'
import Activitys from '../../models/ActivitysSchemas'

export default async (request, response) => {
    dbConnect()

    const {date} = request.query

    const dataArray = date.split('-')
    const data = dataArray[2]+'/'+dataArray[1]+'/'+dataArray[0]

    const itemsList = await Activitys.find({date: data})

    response.json(itemsList)
}