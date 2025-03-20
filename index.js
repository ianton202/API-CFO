import colors from 'colors'
import app from './app.js'
import { connectDB } from './src/config/db.js'

connectDB();
app.listen(3000);
console.log(colors.blue.bold.italic('Server on port', 3000))