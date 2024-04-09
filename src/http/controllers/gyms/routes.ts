import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export const gymsRoutes = async (app: FastifyInstance) => {
    // All routes will pass through the verifyJWT function
    app.addHook("onRequest", verifyJWT)
}