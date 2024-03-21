import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Analytics } from "./components/Analytics";
import { AllIncExp } from "./components/AllIncExp";
import { createContext, useReducer } from "react";
import { budgetReducer, initialState } from "./reducer/budgetReducer";

export const budgetContext = createContext<any>(null);

export function Router() {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/Analytics",
      element: <Analytics />,
    },
    {
      path: "/Incomes",
      element: <AllIncExp dataToRender="income" />,
    },

    {
      path: "/Expenses",
      element: <AllIncExp dataToRender="expense" />,
    },
  ]);
  return (
    <budgetContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </budgetContext.Provider>
  );
}
