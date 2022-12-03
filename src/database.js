import mongoose from "mongoose";
import DB_CONFIG from './config.json'


(async()=>{
    try {
        const db = await mongoose.connect(DB_CONFIG.MONGODB_URL);
        console.log('Conectado a la base de datos: ', db.connection.name)
    } catch (error) {
        console.log('Se ha presentado un error al conectarme con la base de datos')
        console.error(error)
    }
})()