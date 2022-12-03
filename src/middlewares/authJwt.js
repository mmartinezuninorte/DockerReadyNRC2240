import jwt from 'jsonwebtoken'
import CONFIG from '../config.json'
import User from '../models/User'

export const verifyToken = async (req, res, next) =>{
   try {
        const token = req.headers ["x-acces-token"]

        if (!token) return res.status(403).json({message: "No se proporciono Token de validacion"})

        const decoded = jwt.verify(token, CONFIG.SECRET)

        const user = await User.findById(decoded.id, {password:0})

        if(!user) return res.status(404).json({message: 'No se encontro usuario'})

        next()
   } catch (error) {
        return res.status(401).json({message: "Acceso no autorizado"})
   }

}


