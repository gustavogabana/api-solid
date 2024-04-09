import { FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profiles.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";

export const usersRoutes = async (app: FastifyInstance) => {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    /** authenticated */
    app.get('/me', { onRequest: [verifyJWT] }, profile)
}