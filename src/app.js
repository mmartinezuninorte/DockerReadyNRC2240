import express from 'express'
import taskRoutes from './routes/task.router'
import authRoutes from './routes/auth.router'

const app = express();

app.set('port', 3001);

app.use(express.json());

app.get('/',(req, res)=>{
    res.json({message:'Bienvenido a mi BackEnd!, consulta documentacion de mi API-REST para comunicarte conmigo!'})
})

app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRoutes)

export default app