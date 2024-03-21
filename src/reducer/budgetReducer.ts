import { checkLocalStorage } from "../util/util";
import { StateType, ActionType, IncExpData } from "../components/types";
import { stat } from "fs";
import { IncomeExp } from "../components/IncomeExp";

let localSavingString: string | null = localStorage.getItem("saving");

if (!localSavingString) {
  localStorage.setItem("saving", "0");
  localSavingString = localStorage.getItem("saving");
}

export const initialState: StateType = {
  incomes: checkLocalStorage("income"),
  expenses: checkLocalStorage("expense"),
  totalSaving: Number(localSavingString),
};

export function budgetReducer(state: any, action: any) {
  switch (action.type) {
    case "add_income": // add_income
      const newIncomeArray = [...state.incomes, action.payload];
      localStorage.setItem("income", JSON.stringify(newIncomeArray));
      return {
        ...state,
        incomes: newIncomeArray,
      };
    case "add_expense":
      const newExpenseArray = [...state.expenses, action.payload];
      localStorage.setItem("expense", JSON.stringify(newExpenseArray));
      return {
        ...state,
        expenses: newExpenseArray,
      };

    case "edit_income":
      state.incomes.forEach((element: IncExpData, index: number) => {
        if (element.id === action.payload.id) {
          state.incomes[index] = action.payload;
        }
      });
      localStorage.setItem("income", JSON.stringify(state.incomes));
      return {
        ...state,
        incomes: state.incomes,
      };

    case "edit_expense":
      state.expenses.forEach((element: IncExpData, index: number) => {
        if (element.id === action.payload.id) {
          state.expenses[index] = action.payload;
        }
      });
      localStorage.setItem("expense", JSON.stringify(state.expenses));
      return {
        ...state,
        expenses: state.expenses,
      };

    case "delete_income":
      const filteredIncomeArray = state.incomes.filter((data: any) => {
        if (data.id !== action.payload) {
          return data;
        }
      });
      localStorage.setItem("income", JSON.stringify(filteredIncomeArray));

      return {
        ...state,
        incomes: filteredIncomeArray,
      };
    case "delete_expense":
      const filteredExpenseArray = state.expenses.filter((data: any) => {
        if (data.id !== action.payload) {
          return data;
        }
      });
      localStorage.setItem("expense", JSON.stringify(filteredExpenseArray));

      return {
        ...state,
        expenses: filteredExpenseArray,
      };

    case "setTotalSaving":
      return {
        ...state,
        totalSaving: action.payload,
      };

    case "totalIncome":
      return {
        ...state,
        totalIncome: action.payload,
      };
    case "totalExpense":
      return {
        ...state,
        totalExpense: action.payload,
      };

    // case delete_item, payload is id of item, after delete
    default:
      return state;
  }
}
