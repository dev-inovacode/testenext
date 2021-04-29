import dbConnect from '../../dbConnect'
import Question from '../../models/QuestionsSchemas'

export default async (request, response) => {
    dbConnect()

    const {hashtag} = request.query
  
    const search = hashtag == '*' ? {} : {type: hashtag.toUpperCase()}
    const itemsList = await Question.find(search)
    
    response.json(itemsList)
  }