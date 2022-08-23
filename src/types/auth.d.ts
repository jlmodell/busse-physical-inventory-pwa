import type User from "next-auth";
import { type JWT } from "next-auth/jwt";

interface BusseUser extends User {
  Password?: string;
  NewPassword?: string;
  OldPassword?: string;
  Email?: string;
}

interface BusseJWT extends JWT {
  user: BusseUser;
}
