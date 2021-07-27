import dbConnect from '../../../../dbConnect'
import Pendencies from '../../../../models/PendenciesSchemas'
import Users from '../../../../models/UsersSchemas'

export default async (request, response) => {
    dbConnect()

    const {type, date, member} = request.query

    const dataArray = date.split('-')
    const data = new Date(dataArray[0], dataArray[1], dataArray[2])


    let search = {}
    if(type =='Resolvido') {
        search['solved'] = true
    }

    const itemsList = await Pendencies.find(search)

    let filtered = itemsList.filter((item) => {
        if(item.responsible._id == member || member == '*') {
            let f_date
            let inf_date = {}
            if(type == 'Registrado') {
                f_date = item.date.split('/')
                inf_date = new Date(f_date[2], f_date[1], f_date[0])
            }else if(type =='Resolvido' && item.solved == true){
                f_date = item.s_date.split('/')
                inf_date = new Date(f_date[2], f_date[1], f_date[0])
            }
            let diff = (inf_date.getTime() - data.getTime()) / (1000 * 60 * 60 * 24)
            if(diff <= 0) {
                return item
            }
        }
    })

    response.json(filtered)
}