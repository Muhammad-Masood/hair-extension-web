import type { User } from "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth/jwt" {
    interface JWT {
        id: Int
        role: UserRole
    }
  }


  declare module "next-auth" {
    interface Session {
        user: User & {
            id: Int
            role: UserRole
        }
    }
  }