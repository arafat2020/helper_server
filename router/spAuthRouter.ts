import { Router } from "express";
import { login, refresh } from "../controller/apAuth";

const spAuthRouter = Router()

spAuthRouter.route('/login').post(login)
spAuthRouter.route('/refresh').post(refresh)

export default spAuthRouter