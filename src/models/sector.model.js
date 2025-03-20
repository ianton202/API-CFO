import mongoose from 'mongoose';

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
        }
    });

export default mongoose.model('Sector', sectorSchema);