import logo from "../logo.png";
import { Link } from "react-router-dom";
export function Menu() {
  return (
    <div className="menu">
      <div className="logo__wrap">
        <img src={logo} alt="" />
        <p>Budget App</p>
      </div>
      <div className="menu__items">
        <Link to={"/"}>Dashboard</Link>
        <Link to={"/Analytics"}>Analytics</Link>
        <Link to={"/Incomes"}>All Incomes</Link>
        <Link to={"/Expenses"}>All Expenses</Link>
      </div>
    </div>
  );
}
