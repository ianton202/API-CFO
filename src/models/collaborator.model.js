import mongoose from 'mongoose';

const collaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //SI LO PONGO COMO ARRAY PUEDO AGREGAR UN STRING COMO VALOR QUE SEA EL MENSAJE QUE QUIERO QUE APAREZCA
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Profile'
    },
    tribe_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Tribe'
    },
    projects_id: {
        type: [mongoose.Schema.Types.ObjectId],
        trim: true,
        ref: 'Projects'
    }
});

export default mongoose.model('Collaborator', collaboratorSchema);