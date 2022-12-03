import { Router } from "express";
import * as ctrlUser from "../controllers/authcontroller"

const router = Router()

router.post('/signup', ctrlUser.singUp)

router.post('/signin', ctrlUser.singIn)

export default router