import mongoose from 'mongoose'

export default async function dbConnect() {
    if(mongoose.connection.readyState >= 1) return

    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

export function jsonify(obj) {
    return JSON.parse(JSON.stringify(obj))
}