import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import User from "../models/user.model";

interface AuthRequest extends Request {
  userId?: string;
}

const verifyToken = async (req: AuthRequest, res: Response, next) => {
  let token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  const decoded = jwt.verify(token, config.secret) as any;
  req.userId = decoded.id;
  next();
};

const isAdmin = async (req: AuthRequest, res: Response, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Require Admin Role!",
  });
  return;
};

const isModerator = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Require Moderator Role!",
  });
};

const isModeratorOrAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }

    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Require Moderator or Admin Role!",
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
export default authJwt;
