import dbConnect from './dbConnect'
import Question from './modelQuestions'

export default async (request, response) => {
    dbConnect()
  
    const itemsList = await Question.find({})
    
    response.json(itemsList)
  }