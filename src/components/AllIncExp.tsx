import { useContext } from "react";

import { Menu } from "./Menu";
import { DataRenderer } from "./DataRenderer";
import { budgetContext } from "../Router";

export function AllIncExp({ dataToRender }: { dataToRender: string }) {
  const { state } = useContext(budgetContext);

  return (
    <div className="App">
      <Menu />
      <div className="AllIncExp">
        <DataRenderer
          dataToRender={
            dataToRender === "income" ? state.incomes : state.expenses
          }
        />
      </div>
    </div>
  );
}
