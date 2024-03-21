import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod"; // Add new import

export type IncExpData = {
  source: string;
  amount: number;
  date: string;
  category: string;
  id: number;
};

export type FormData = {
  label: string;
  placeholder: string;
  type: string;
  category?: string;
  id?: number;
  field?: string;
};

export type InputData = {
  source: string;
  amount: string;
  date: string;
  category: string;
};

export type HandleInputChange = {};

export type StateType = {
  incomes: IncExpData[];
  expenses: IncExpData[];
  totalSaving: number;
};

export type ActionType =
  | { type: "add_income"; payload: FormData }
  | { type: "add_expense"; payload: FormData }
  | { type: "edit_income"; payload: FormData }
  | { type: "edit_expense"; payload: FormData }
  | { type: "setTotalSaving"; payload: number }
  | { type: "totalIncome"; payload: number }
  | { type: "totalExpense"; payload: number }
  | { type: "delete_income"; payload: number }
  | { type: "delete_expense"; payload: number };

export type BalanceProps = {
  totalExpense: number;
  totalIncome: number;
  totalSaving: number;
  setTotalSaving: React.Dispatch<ActionType>;
};

export type DataProp = {
  toRender: IncExpData;
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  handleEdit?: (e: React.MouseEvent<HTMLButtonElement>, id: IncExpData) => void;
};

export type DataRendererProp = {
  dataToRender: IncExpData[];
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  handleEdit?: (e: React.MouseEvent<HTMLButtonElement>, id: IncExpData) => void;
};

export type FormProp = {
  handleFormSubmit: any; //(e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData[];
  optionData?: string[];
  // handleInputChange: (e: handleInputChangeType) => void;
  zodSchema: any;
  section: string;
};

export type IncomeExpProp = {
  section: string;
  dataToRender: IncExpData[];
  setIncomesExpenses: React.Dispatch<ActionType>;
  balance: number;
};

export type InputProp = {
  label: string;
  placeholder: string;
  type: string;
  // handleInputChange: (e: handleInputChangeType) => void;
  register1: any; //UseFormRegister<FormData>;
  error: any;
  errorName: string;
  field?: string;
  section: string;
};

export type handleInputChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export type handleFormSubmitType = React.FormEvent<HTMLFormElement>;

export type handleDeleteType = React.MouseEvent<HTMLButtonElement>;
export type handleEditType = React.MouseEvent<HTMLButtonElement>;

export type ZodFormData = {
  source?: string;
  amount?: number;
  date?: string;
};
