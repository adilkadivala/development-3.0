import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  // clear syntax
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

  // second syntax
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      let username = opts.ctx.username;
      let email = opts.input.email;
      let password = opts.input.password;

      //do validation here
      // database query here

      let token = "ask@#md";
      return {
        token,
        username,
      };
    }),

  createNewTodo: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async (opts) => {
      console.log(opts.ctx.username);
      return {
        id: "1",
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    // verify JWT
    return {
      username: "User",
    };
  },
});

server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
