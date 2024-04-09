import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search.controller";
import { nearby } from "./nearby.controller";
import { create } from "./create.controller";

export const gymsRoutes = async (app: FastifyInstance) => {
    // All routes will pass through the verifyJWT function
    app.addHook("onRequest", verifyJWT)

    app.get("/gyms/search", search)
    app.get("/gyms/nearby", nearby)

    app.post("/gyms", create)
}