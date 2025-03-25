import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Client'
    },
    tribe_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Tribe'
    },
    collaborator_id: {
        type: [mongoose.Schema.Types.ObjectId],
        trim: true,
        ref: 'Collaborator'
    }
});

export default mongoose.model('Project', projectSchema);