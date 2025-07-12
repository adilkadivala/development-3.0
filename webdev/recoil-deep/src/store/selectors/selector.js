import { atomFamily, selector, selectorFamily } from "recoil";
import {
  JobskAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
} from "../atoms/atoms";

export const totalNotficationSelector = selector({
  key: "totalnotification",
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobCount = get(JobskAtom);
    const notificationCount = get(notificationAtom);
    const messageCount = get(messagingAtom);

    const finalCount =
      networkCount + jobCount + notificationCount + messageCount;

    return finalCount;
  },
});

export const TodosSelectorFamily = atomFamily({
  key: "todosfmaily",
  default: selectorFamily({
    key: "selectorsfamily",
    get:
      (id) =>
      async ({ get }) => {
        await new Promise((r) => setTimeout(r, 3000));
        
        const res = await fetch(`https://dummyjson.com/todos/${id}`);
        return res.json();
      },
  }),
});
