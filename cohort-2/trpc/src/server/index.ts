import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;

    // make database stuff here

    return {
      id: "1",
      title: title,
      description: description,
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
