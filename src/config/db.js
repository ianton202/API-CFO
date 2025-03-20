import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI) 
        const url = `${connection.host}:${connection.port}/${connection.name}`
        console.log(colors.blue.bold.italic(`Conectado a la DB: ${url}`)) 

    } catch (error) {
        console.log(colors.bgRed.white.bold(error.message))
        process.exit(1)
    }
}