import mongoose from 'mongoose';

const collaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //SI LO PONGO COMO ARRAY PUEDO AGREGAR UN STRING COMO VALOR QUE SEA EL MENSAJE QUE QUIERO QUE APAREZCA
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    profile_id: {
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
    project_id: {
        type: [mongoose.Schema.Types.ObjectId],  
        trim: true,
        ref: 'Project'
    }
});

export default mongoose.model('Collaborator', collaboratorSchema);