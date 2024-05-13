import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.DATABASE_URI}/jobseeker`);
        console.log(`Database Connected Successfully !!  DB Host: ${dbInstance.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting database. -> ${error}`)
        process.exit(1);
    }
}


export default connectDB