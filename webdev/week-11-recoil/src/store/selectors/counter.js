import { selector } from "recoil";
import { counterAtom } from "../atoms/counter";

export const evenNo = selector({
  key: "isEven",
  get: ({ get }) => {
    const count = get(counterAtom);
    const isEven = count % 2 == 0;
    return isEven;
  },
});

export const oddNo = selector({
  key: "isOdd",
  get: ({ get }) => {
    const count = get(counterAtom);
    const isOdd = count % 2 != 0;
    return isOdd;
  },
});
