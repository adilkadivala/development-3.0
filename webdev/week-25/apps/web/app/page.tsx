import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { client } from "@/repo/prisma/client";



export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <main className={styles.main}>
      <h1>Welcome to the Web App!</h1>
      <p>Hello, {user?.name}!</p>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </main>
  );
}
