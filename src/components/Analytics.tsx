import { BarChart } from "@mui/x-charts/BarChart";
import { useContext } from "react";

import { Menu } from "./Menu";
import { IncExpData } from "./types";
import { budgetContext } from "../Router";

export function Analytics() {
  const { state } = useContext(budgetContext);

  const totalIncome = state.incomes.reduce(
    (acc: number, curr: IncExpData) => acc + curr.amount,
    0
  );
  const totalExpense = state.expenses.reduce(
    (acc: number, curr: IncExpData) => acc + curr.amount,
    0
  );
  const balance = totalIncome - totalExpense - state.totalSaving;

  const incomeCategories: string[] = [
    "Employment income",
    "Business profits",
    "Side hustle",
    "Investment profits",
    "Other",
  ];

  const incomeCategoriesAmounts: number[] = [];
  incomeCategories.forEach((category: string) => {
    let amount: number = 0;
    state.incomes.forEach((income: IncExpData) => {
      if (income.category === category) {
        amount += income.amount;
      }
    });
    incomeCategoriesAmounts.push(amount);
  });

  const expenseCategories: string[] = [
    "Food",
    "Clothing",
    "Utilities",
    "Transportation",
    "Other",
  ];

  const expenseCategoriesAmounts: number[] = [];
  expenseCategories.forEach((category: string) => {
    let amount: number = 0;
    state.expenses.forEach((expense: IncExpData) => {
      if (expense.category === category) {
        amount += expense.amount;
      }
    });
    expenseCategoriesAmounts.push(amount);
  });

  return (
    <div className="App">
      <Menu />
      <div className="analytics__wrap">
        <div className="totals">
          <div>
            <h2>Total Income</h2>
            <h2>{totalIncome.toLocaleString()}</h2>
          </div>

          <div>
            <h2>Total Expense</h2>
            <h2>{totalExpense.toLocaleString()}</h2>
          </div>

          <div>
            <h2>Total Saving</h2>
            <h2>{state.totalSaving.toLocaleString()}</h2>
          </div>

          <div>
            <h2>Balance</h2>
            <h2>{balance.toLocaleString()}</h2>
          </div>
        </div>

        <div className="analytics">
          <div className="analytics__block">
            <h1>Incomes</h1>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: incomeCategories,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: incomeCategoriesAmounts,
                },
              ]}
              height={300}
            />
          </div>
          <div className="analytics__block">
            <h1>Expenses</h1>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: expenseCategories,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: expenseCategoriesAmounts,
                },
              ]}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
