"use client";

import { TextInput } from "@repo/ui/text-input";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          flexDirection: "column",
        }}
      >
        <TextInput
          onChange={() => {
            alert("hey");
          }}
          type="text"
          placeholder="write message ..."
        />
        <Button>Send</Button>
      </div>
    </div>
  );
}
