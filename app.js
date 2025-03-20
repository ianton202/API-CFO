//Configuracion del Backend

import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import authRoutes from './src/routes/auth.routes.js'
import clientRoutes from './src/routes/client.routes.js'
import collaboratorRoutes from './src/routes/collaborator.routes.js'
import profileRoutes from './src/routes/profile.routes.js'
import projectRoutes from './src/routes/project.routes.js'
import sectorRoutes from './src/routes/sector.routes.js'
import tribeRoutes from './src/routes/tribe.routes.js'

//Para que el servidor pueda escuchar peticiones http
const app = express()

app.use(morgan('dev'))
app.use(express.json())
//Convierte las cookies en objetos
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/collaborators', collaboratorRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/sectors', sectorRoutes)
app.use('/api/tribes', tribeRoutes)

export default app