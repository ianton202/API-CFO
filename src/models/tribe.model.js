import mongoose from "mongoose";

const tribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    collaborators_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Collaborators'
    }
});

export default mongoose.model('Tribe', tribeSchema);