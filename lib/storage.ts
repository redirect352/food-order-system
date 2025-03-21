import { WebStorage } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

export const sessionStorage =
  typeof window !== "undefined"
    ? createWebStorage('session')
    : createNoopStorage();
export const localStorage =
  typeof window !== "undefined"
    ? createWebStorage('local')
    : createNoopStorage();