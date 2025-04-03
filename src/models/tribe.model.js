import mongoose from "mongoose"

const tribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    project_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Project'
    }
})

export default mongoose.model('Tribe', tribeSchema)