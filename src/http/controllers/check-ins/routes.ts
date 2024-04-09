import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { create } from "../check-ins/create.controller"
import { validate } from "./validate.controller"
import { history } from "./history.controller"
import { metrics } from "./metrics.controller"

export const checkInsRoutes = async (app: FastifyInstance) => {
    // All routes will pass through the verifyJWT function
    app.addHook("onRequest", verifyJWT)

    app.get("/check-ins/history", history)
    app.get("/check-ins/metrics", metrics)

    app.post("/gyms/:gymId/check-ins", create)
    
    app.patch("/check-ins/:checkInId/validate", validate)
}