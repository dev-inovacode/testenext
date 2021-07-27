import dbConnect from '../../dbConnect'
import Pendencies from '../../models/PendenciesSchemas'
import Users from '../../models/UsersSchemas'

export default async (request, response) => {
    const {member} = request.query

    dbConnect()
    
    let search = {}

    search['solved'] = false

    const itemsList = await Pendencies.find(search)
    
    const filtered = itemsList.filter((item) => {
        if(item.responsible._id == member || member == '*') {
            return item
        }
    })


    response.json(filtered)
}