import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'questionsschemas'

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {type: String},
    answer: {type: String, default: ''},
    number: {type: String},
    group: {type: String},
    date: {type: String},
    type: {type: String},
    status: {type: String, default: 'aberto'},
    responsible: {type: String, ref: 'usersschemas'},
    date_ans: {type: String, default: ''},
    likes: {type: Array, default: []},
    priority: {type: String, default: 'baixa'},
    __v: {type: Number, default: 0}
}, {
    timestamps: true
})

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "questionsschemas")