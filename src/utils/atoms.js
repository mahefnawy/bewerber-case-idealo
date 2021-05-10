import { atom } from "recoil";
import Data from "./data";

var usersDataStore = Data.usersData;

export const usersDataAtom = atom({
  key: 'usersDataAtom',
  default: usersDataStore
});
