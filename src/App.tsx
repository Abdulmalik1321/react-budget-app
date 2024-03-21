import { useContext, useReducer } from "react";

import "./App.css";
import { Menu } from "./components/Menu";
import { Saving } from "./components/Saving";
import { Balance } from "./components/Balance";
import { IncomeExp } from "./components/IncomeExp";
import { IncExpData, StateType } from "./components/types";
import { budgetReducer, initialState } from "./reducer/budgetReducer";

import { budgetContext } from "./Router";

export function App() {
  const { state, dispatch } = useContext(budgetContext);

  const totalIncome = state.incomes.reduce(
    (acc: number, curr: IncExpData) => acc + curr.amount,
    0
  );
  const totalExpense = state.expenses.reduce(
    (acc: number, curr: IncExpData) => acc + curr.amount,
    0
  );

  return (
    <div className="App">
      <Menu />
      <div className="dashboard">
        <IncomeExp
          dataToRender={state.incomes}
          section={"income"}
          setIncomesExpenses={dispatch}
          balance={totalIncome - totalExpense - state.totalSaving}
        />
        <IncomeExp
          dataToRender={state.expenses}
          section={"expense"}
          setIncomesExpenses={dispatch}
          balance={totalIncome - totalExpense - state.totalSaving}
        />
        <div className="balanceSaving">
          <Balance
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalSaving={state.totalSaving}
            setTotalSaving={dispatch}
          />
          <Saving totalSaving={state.totalSaving} />
        </div>
      </div>
    </div>
  );
}
