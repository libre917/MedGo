import express from 'express';
import cors from 'cors';
const app = express();
const port = 3001;

import medicosRouter from './routes/medicosRouter.js'
import pacientesRouter from './routes/pacientesRouter.js'
import agendaRouter from './routes/agendaRouter.js'
import clinicaRouter from './routes/clinicasRouter.js'
import horariosRouter from './routes/horariosRouter.js'
import authRouter from './routes/authRouter.js' 

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({mensagem: 'Funcionou'}) 
})

app.use('/medicos', medicosRouter)
app.use('/pacientes', pacientesRouter)
app.use('/agendamentos', agendaRouter)
app.use('/clinicas', clinicaRouter)
app.use('/horarios', horariosRouter)
app.use('/auth', authRouter)
app.use((req,res)=>{
    res.status(404).json({mensagem: 'Rota não encontrada'})
})
app.listen(port, ()=>{
    console.log(`Server funcionando na porta: http://localhost:${port}`)
})