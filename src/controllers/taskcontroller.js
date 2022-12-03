import Task from '../models/Task'

export const findAllTasks = async (req, res)=>{
    try {
        const {offset, limit} = req.query
        const tareas = await Task.paginate({},{offset: offset, limit:limit})
        res.json(tareas);
    } catch (error) {
        res.status(error.status || 500).json({
            message: "Opps, algo fallo al consultar todas las tareas"
        })
    }
}

export const findOneTask = async (req, res)=>{
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if(!task) return res.status(404)
                            .json({message:`La tarea con ${id} no existe, o no pudo ser encontrada`})
        res.json(task)
    } catch (error) {
        res.status(500).json({message: `Error inesperado al buscar la tarea con id ${id}`})
    }
}

export const newTask = async (req, res)=>{
    if(!req.body.title){
        return res.status(400).json({message: "El campo titulo es requerido!"})
    }
    try {
        const newTask = new Task ({
            title: req.body.title,
            description: req.body.description  
         });
         await newTask.save();
         console.log(newTask);
         res.send('Tarea guardada!')
    } catch (error) {
        res.status(500).json({
            message: "Algo fallo al momento de crear la nueva tarea"
        })
    }
}

export const deleteTask = async (req, res) =>{
    const id = req.params.id
    try {
        await Task.findByIdAndDelete(id)
        res.json({message: `La tarea con id: ${id} fue eliminada satisfactoriamente!`}) 
    } catch (error) {
        res.status(500).json({
            message: `No se pudo eliminar la tarea con id ${id}`
        })
    }
}

export const updateTask = async (req, res) =>{
    const id = req.params.id
    try {
        await Task.findByIdAndUpdate(id, req.body)
        res.json({message: `La tarea con id: ${id} ha sido actualizada!`})
    } catch (error) {
        res.status(500).json({
            message: `Error al buscar la tarea con id ${id}`
        })
    }
}

export const findOneTaskName = async (req, res)=>{
    if (!req.body.title) return res.status(400).json({message: "Se necesita title a buscar"})
    const title = req.body.title
    try {
        const result = await Task.find({title: { $regex: title, $options: 'i' }})
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message: `Algo fallo al buscar: ${title}`
        })   
    }
}