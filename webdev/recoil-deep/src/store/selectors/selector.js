import { selector } from "recoil";
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
