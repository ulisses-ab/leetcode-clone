import { Role } from "../types/Role"

export type User = {
  id: string,
  handle: string,
  email: string,
  role: Role,
  passwordHash: string,
  createdAt: Date,
  updatedAt: Date,
}