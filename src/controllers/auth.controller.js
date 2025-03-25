import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/jwt.js'

export const register =  async (req, res) => {

    const { username, email, password } = req.body

    try {
        const mailRegistered = await User.findOne({ email })
        if (mailRegistered) {
            return res.status(409).json({ message: 'There is already a user with that email'})
        }

        const usernameRegistered = await User.findOne({ username })
        if (usernameRegistered) {
            return res.status(400).json({ message: 'The username already exists'})
        } 

        //Hasheo la contraseña para que no se pueda ver en la base de datos (10 es la cantidad de veces que se hashea)
        const passwordHash = await bcrypt.hash(password, 10) 
        const newUser = new User({ 
            username,
            email,
            password: passwordHash
        })
        const userSaved = await newUser.save()
     
        res.status(200).json({ message: 'User created successfully', data: { userSaved }})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to create the user', error: error.message || error })
    }
}

export const login =  async (req, res) => {

    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(400).json({ message: 'User not found' })
        }

        //Compara la contraseña puesta con la del usuario encontrado
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        //Llamo a la funcion para crear el token y le envio el ID COMO PAYLOAD
        const token = await createAccessToken({ id: userFound._id }) 
        //Establezco una cookie llamada 'token'y guardo el valor de la variable token en dicha cookie
        res.cookie('token', token)

        res.status(200).json({ message: 'Login successfull' })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while trying to log in', error: error.message || error })
    }
}

export const logout = (_req, res) => {
    //Indico que el token va a estar vacio
    res.cookie('token', '', {
        //Indico que la fecha de expiracion del token es 0 (no hay token)
        expires: new Date(0)
    })
    return res.status(200).json({ message: 'Logout successfull' })
}

export const uProfile = async (req, res) => {
    const userFound = await  User.findById(req.user.id)
    if(!userFound) {
        return res.status(400).json({ message: 'User not found' })
    }

    return res.status(200).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}