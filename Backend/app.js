import express, { application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// app.use(cors)

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())




import userRouter from './routes/user.route.js'
import jobRouter from './routes/job.route.js'
import applicationRouter from './routes/application.route.js'

app.use("/api/v1/user", userRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)


export default app


