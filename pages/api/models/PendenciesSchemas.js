import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'pendenciesschemas'

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    responsible: {
        _id: {type: String},
        name: {type: String}
    },
    pendency: {type: String},
    date: {type: String},
    hour: {type: String},
    solved: {type: Boolean, default: false},
    s_date: {type: String},
    s_hour: {type: String},
    __v: {type: Number, default: 0}
}, {
    timestamps: false
})

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "pendenciesschemas")