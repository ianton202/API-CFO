import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    collaboator_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Collaborator'
    }
})

export default mongoose.model('Profile', profileSchema)