import jwt from 'jsonwebtoken'
import { token_secret } from './st.js'

//Creacion de una funcion para generar un token
//payload es la informacion que quiero guardar en el token

export function createAccessToken(payload) {

    //Crea y devuelve una promesa (la funcion es asincrona) 
    return new Promise((resolve, reject) => {
        //Genero token
        jwt.sign(
            //Datos que quiero guardar en el token
            payload,
            token_secret,
            {
            expiresIn: '1d'
            },
            (error, token) => {
                //Si hay un error se rechaza la promesa y devuelve el error
                if (error) reject(error)
                //Sino resuelve la promesa y devuelve el token
                resolve(token)
            }
        )
    })
}