import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import { apiError } from './apiError.js';
import dotenv from 'dotenv'

dotenv.config({
    path: "./.env"
})


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const fileUploader = async (localFilePath) => {
    console.log(`Starting Cloudinary`)
    console.log(cloudinary.config().cloud_name);

    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
    })
    if(!response){
        throw new apiError(503, "Problem on uploading on cloudinary")
    }
    return response
}

// const fileUploader = async (localFilePath) => {
//     try {
//         if(!localFilePath) return null;
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         if(!response){
//             throw new apiError(402, "File is not upload on cloudinary")
//         }
//         console.log(`File Uploaded on cloudinary successfully`);
//         return response
//     } catch (error) {
//         console.log(`Error while uploading files on cloudinary`)
//     }
// }

export default fileUploader

// export {cloudinary}