import mongoose from 'mongoose'

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    client_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Client'
    }
})

export default mongoose.model('Sector', sectorSchema)