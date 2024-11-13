import type { NextFunction, Response, Request } from "express";
import { permissions } from "../auth/permissions";
import type { Roles } from "../auth/roles";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const user = {
    id: 1,
    username: "User",
    role: "user",
  };

  req.user = user;

  next();
};

export const isAuthorized =
  (requiredPermissions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role as Roles;

    if (!userRole) {
      res.status(403).json({ message: "Forbidden" });
    }

    const hasPermission = requiredPermissions.some((permission) =>
      permissions[userRole].includes(permission),
    );

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
