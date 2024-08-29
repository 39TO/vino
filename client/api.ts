import type { AppType } from "../server/src/index";
import { hc } from "hono/client";

const client = hc<AppType>("/");

const res = await client.api.users.$post({
  json: {
    name: "young",
    age: 20,
  },
});

if (res.status === 201)
  if (res.ok) {
    const data = await res.json();
    console.log(data.message);
  }

const res2 = await client.api.posts.$post();

if (res2.ok) {
  const data = await res2.json();
  console.log(data.message);
}
