import { Roles } from "./roles";

export const permissions = {
  [Roles.ADMIN]: ["read", "write", "delete"],
  [Roles.MANAGER]: ["read", "write"],
  [Roles.USER]: ["read"],
};
