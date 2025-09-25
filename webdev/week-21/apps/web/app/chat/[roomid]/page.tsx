"use client";

import { TextInput } from "@repo/ui/text-input";

export default function ChatRoom() {
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
      <div>chat room</div>
      <div>
        <TextInput
          type="text"
          onChange={() => {}}
          placeholder="write a message..."
        />
      </div>
    </div>
  );
}
