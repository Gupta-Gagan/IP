import dotenv from 'dotenv'
dotenv.config({
    path: "./.env"
})

import app from './app.js'

import connectDB from './DB/database.js'


console.log("Application start\n")
console.log(process.env.port)



connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(`MongoDB connection failed -> ${error}`)
})


