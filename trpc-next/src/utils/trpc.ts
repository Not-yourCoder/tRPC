import { AppRouter } from "@/server/routers/api";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

function getBaseUrl() {
  if (typeof window !== "undefined") return;
  return `http://localhost:3000`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
});
