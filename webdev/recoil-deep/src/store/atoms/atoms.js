import { atom, atomFamily } from "recoil";
import { TODOS } from "../../todos";

export const networkAtom = atom({
  key: "network",
  default: 100,
});
export const JobskAtom = atom({
  key: "jobs",
  default: 0,
});
export const notificationAtom = atom({
  key: "notification",
  default: 100,
});
export const messagingAtom = atom({
  key: "message",
  default: 3,
});

export const todosFamily = atomFamily({
  key: "todo",
  default: (id) => {
    return TODOS.find((t) => t.id === id);
  },
});
