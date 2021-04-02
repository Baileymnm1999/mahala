import { Request, Response } from "express";
import { ROLES } from "../models/role.model";
import User from "../models/user.model";

const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next
) => {
  // Username
  var user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    res.status(400).send({
      message: "Failed! Username is already in use!",
    });
    return;
  }

  // Email
  user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    res.status(400).send({
      message: "Failed! Email is already in use!",
    });
    return;
  }

  next();
};

const checkRolesExisted = (req: Request, res: Response, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Object.values(ROLES).includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
