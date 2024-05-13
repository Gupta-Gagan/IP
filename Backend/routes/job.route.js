import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { deleteJob, getAllJobs, myJobs, postJob, updateJobs, getSingeJob } from "../controllers/job.controller.js";

const router = Router()

router.route("/all-jobs").get( getAllJobs)
router.route("/post-job").post(verifyJWT, postJob)
router.route("/my-jobs").get(verifyJWT, myJobs)
router.route("/update-job/:id").put(verifyJWT, updateJobs)
router.route("/deleteJob/:id").delete(verifyJWT, deleteJob)
router.route("/:id").get(verifyJWT, getSingeJob )


export default router
