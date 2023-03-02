import express, { Request, Response } from 'express'
import spAuthRouter from './router/spAuthRouter'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use(spAuthRouter)



app.get('/', (req: Request, res: Response) => {
    res.send({
        running: true,
        msg: 'ok'
    })
})



app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})