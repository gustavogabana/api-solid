import { FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profiles.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh.controller";

export const usersRoutes = async (app: FastifyInstance) => {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.patch('/token/refresh', refresh)

    /** authenticated */
    app.get('/me', { onRequest: [verifyJWT] }, profile)
}