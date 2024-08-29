import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/json", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "secret",
  })
);

app.get("/admin", (c) => {
  return c.text("You are authorized!");
});

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const routes = app.post("/api/users", zValidator("json", schema), (c) => {
  const data = c.req.valid("json");
  return c.json(
    {
      message: `${data.name} is ${data.age} years old`,
    },
    201
  );
});

const routes2 = app.post("/api/posts", (c) => {
  return c.json({
    message: `young man is 20 years old`,
  });
});

export type AppType = typeof routes & typeof routes2;

export default app;
