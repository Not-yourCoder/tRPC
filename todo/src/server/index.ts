//in here we have a trpc router instance that is gonna
//have procedures as functions in it

import Database from "better-sqlite3";
import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { todos } from "@/db/schems";
import { z } from "zod";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });
export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  addTodos: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(todos).values({ content: opts.input, done: 0 }).run();
    return true;
  }),
  doneTodos: publicProcedure
    .input(z.object({ id: z.number(), done: z.number() }))
    .mutation(async (opts) => {
      await db
        .update(todos)
        .set({ done: opts.input.done })
        .where(eq(todos.id, opts.input.id))
        .run();
      return true;
    }),
});

export type AppRouter = typeof appRouter;

//now we need it to connect it to our app router
