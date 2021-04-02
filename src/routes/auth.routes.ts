import { Express, Request, Response } from "express";
import * as controller from "../controllers/auth.controller";
import { verifySignUp } from "../middleware";

export default function (app: Express) {
  app.use(function (req: Request, res: Response, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
}
