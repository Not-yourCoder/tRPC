//initialize trpc and we get back a router
//and a public procedure
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const { createCallerFactory } = t
export const router = t.router;
export const publicProcedure = t.procedure;