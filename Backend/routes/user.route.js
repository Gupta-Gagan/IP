import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

//Register
router.route("/register").post(registerUser)

//Login
router.route("/login").post(loginUser)

//Logout
router.route("/logout").get(verifyJWT, logoutUser)

router.route("/get-user").get(verifyJWT, getUser)


export default router