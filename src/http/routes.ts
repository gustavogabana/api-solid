import { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profiles.controller";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    /** authenticated */

    app.get('/me', profile)
}