import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

import medicosRouter from './routes/medicosRouter.js'
import pacientesRouter from './routes/pacientes.Router.js'

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({mensagem: 'Funcionou'}) 
})

app.use('/Medicos', medicosRouter)
app.use('/Pacientes', pacientesRouter)
app.use((req,res)=>{
    res.status(404).json({mensagem: 'Rota não encontrada'})
})
app.listen(port, ()=>{
    console.log(`Server funcionando na porta: http://localhost:${port}`)
})