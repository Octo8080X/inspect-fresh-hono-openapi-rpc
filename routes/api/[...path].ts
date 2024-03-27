import { Handler } from "$fresh/server.ts";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const ParamsSchema = z.object({});

console.log(z.string());

const HeloWorldSchema = z
  .object({
    message: z.string().openapi({
      example: "Hello World!",
    }),
  })
  .openapi("HeloWorldResponse");

const route = createRoute({
  method: "get",
  path: "/api/hello_world",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HeloWorldSchema,
        },
      },
      description: "Hello World!",
    },
  },
});

const app = new OpenAPIHono();

const appRoutes = app.openapi(route, (c) => {
  return c.json({
    message: "Hello World!",
  });
});

app.doc("/api/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "API",
  },
});

export const handler: Handler = app.fetch;

export type AppRoutesType = typeof appRoutes;
