// Con esto vamos a hacer validaciones basados en esos tokens que estamos recibiendo
// Asi que de aqui directamente pasa a crear la carpeta middlewares
import User from '../models/User'
import jwt from 'jsonwebtoken'
import CONFIG from '../config.json'
import Role from '../models/Role'

export const singUp = async (req, res)=>{
    const {username, email, password, roles} = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    const savedUser = await  newUser.save()

    const token = jwt.sign({id: savedUser._id},CONFIG.SECRET,{

        expiresIn: 86400
    })
    console.log(savedUser)
    res.status(200).json({message: "Usuario registrado", token})

}

export const singIn = async (req, res)=>{
    const userFound = await User.findOne({email: req.body.email})

    if (!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({message: "Contraseña invalida"})

    const token = jwt.sign({id: userFound._id}, CONFIG.SECRET, {
        expiresIn: 86400
    })
    res.status(200).json({message:"Inicio de sesion exitoso!", token})
}