import { Router } from "express";
import { employerGetAllApplication, jobSeekerGetAllApplication, jobSeekerDeleteApplication, postApplication } from "../controllers/application.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/jobSeeker/getAll").get(verifyJWT,jobSeekerGetAllApplication)

router.route("/employer/getAll").get(verifyJWT, employerGetAllApplication)

router.route("/jobSeeker/deleteApplication/:id").delete(verifyJWT, jobSeekerDeleteApplication)

router.route("/postApplication").post(upload.fields([
    {
        name:"resume",
        maxCount: 1
    }
]), verifyJWT, postApplication )

export default router


