import { useEffect, useState } from "preact/hooks";
import { hc } from "hono/client";
import type { AppRoutesType } from "../routes/api/[...path].ts";
const client = hc<AppRoutesType>("http://localhost:8000/");

export default function HelloWorld() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const call = async () => {
      const response = await client.api.hello_world.$get({ param: {} });
      const data = await response.json();
      setMessage(data.message);
    };
    call();
  }, []);

  return (
    <div class="flex gap-8 py-6">
      <h1>{message}</h1>
    </div>
  );
}
