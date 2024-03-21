import { IncExpData } from "../components/types";

export function checkLocalStorage(localStorageKey: string) {
  let localIncomeString: string | null = localStorage.getItem(localStorageKey);

  if (!localIncomeString) {
    localStorage.setItem(localStorageKey, JSON.stringify([]));
    localIncomeString = localStorage.getItem(localStorageKey);
  }

  let localData: IncExpData[] = [];
  if (localIncomeString) {
    localData = JSON.parse(localIncomeString);
  }

  return localData;
}
