import jwt from 'jsonwebtoken'
import { token_secret } from '../utils/st.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    //Verifica si el token es válido
    jwt.verify(token, token_secret, (error, user) => { 
        if (error) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        
        //Si el token es válido, los datos del usuario se adjuntan a req.user para que los controladores los puedan utilizar.
        req.user = user

        next()
    })
}