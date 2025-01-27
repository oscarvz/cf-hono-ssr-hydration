import { hc } from "hono/client";
import { useState } from "react";

import type { Api } from "../../api";
import styles from "./Counter.module.css";
const client = hc<Api>("/api");

export function Counter({ score }: { score: number }) {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>();

  const getScore = async () => {
    try {
      const res = await client.index.$get();
      const { message } = await res.json();
      setMessage(message);
    } catch (error) {
      console.error("Error fetching message", error);
    }
  };

  return (
    <section className={styles.section}>
      <div data-content-grid>
        <div>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Increase count
          </button>
          <span>Count: {count}</span>
          <span>score: {score}</span>
        </div>

        <div>
          <button type="button" onClick={getScore} disabled={!!message}>
            Fetch message
          </button>
          <span>{message}</span>
        </div>
      </div>
    </section>
  );
}
