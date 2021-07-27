import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = "tagsschemas"

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    addedOn: String,
    tags: String,
    __v: {type: Number, default: 0}
}, {
    timestamps: false
})

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "tagsschemas")