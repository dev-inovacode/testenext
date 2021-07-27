import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'activitysschemas'

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    activity: {type: String},
    date: {type: String},
    hour: {type: String},
    __v: {type: Number, default: 0}
}, {
    timestamps: false
})

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "activitysschemas")