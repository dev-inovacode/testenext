import dbConnect from '../../dbConnect'
import Question from '../../models/QuestionsSchemas'

export default async (request, response) => {
    dbConnect()

    const {type} = request.query

    switch (type) {
        case 'weekResume':
            const items = await Question.find({ "type": { $ne: "SUGESTAO" } })

            let dt = new Date()
            dt.setHours(dt.getHours() - 3)
            let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
            //para para deploy na vercel atraso de 3 horas

            let weekResume = []

            for(let i = 40; i < 50; i++) {
                let dt = new Date()
                dt.setHours(dt.getHours() - 3)
                dt.setDate(dt.getDate() - i)
                let dt_reg = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()

                const qtd = items.filter((item) => {
                    if(item.date.search(dt_reg) > -1){return item}
                }).length

                weekResume.push({date: dt_reg, value: qtd})
            }

            response.json(weekResume.reverse())
            break

        case value:
            break
            
        default:
            return response.status(404)
            break
        }
}