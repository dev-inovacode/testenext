import mongoose, {Schema} from 'mongoose'

const MODEL_NAME = 'usersschemas'

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, unique: true},
    name: {type: String},
    function: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    phone: {type: String},
    dt_reg: {type: String},
    in_resolution: {type: Number, default: 0},
    closed: {type: Number, default: 0},
    __v: {type: Number, default: 0}
}, {
    timestamps: true
})

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, "usersschemas")