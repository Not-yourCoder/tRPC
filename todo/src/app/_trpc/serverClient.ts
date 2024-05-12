import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";
import { initTRPC } from "@trpc/server";


export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api.trpc",
    }),
  ],
});
