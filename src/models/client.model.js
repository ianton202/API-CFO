import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sector_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector'
    },
    projects_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Project'
    }
})

export default mongoose.model('Client', clientSchema)