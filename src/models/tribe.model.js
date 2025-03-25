import mongoose from "mongoose";

const tribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    collaborator_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Collaborator'
    }
});

export default mongoose.model('Tribe', tribeSchema);