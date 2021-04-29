import dbConnect from '../../../dbConnect'
import Question from '../../../models/QuestionsSchemas'

export default async (request, response) => {
    dbConnect()

    const {hash, campo} = request.query

    const search = hash == '*' ? {} : {type: hash.toUpperCase()}

    const itemsList = await Question.find(search).distinct(campo)
    
    response.json(itemsList)
}