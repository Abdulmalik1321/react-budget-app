import { z, ZodType } from "zod";

import { Form } from "./Form";
import { DataRenderer } from "./DataRenderer";
import {
  FormData,
  IncomeExpProp,
  handleFormSubmitType,
  handleDeleteType,
  ZodFormData,
  handleEditType,
  IncExpData,
} from "./types";
import { useState } from "react";

export function IncomeExp({
  section,
  dataToRender,
  setIncomesExpenses,
  balance,
}: IncomeExpProp) {
  const [edit, setEdit] = useState(0);

  const formData: FormData[] = [
    {
      label: "Source",
      placeholder: section === "income" ? "Ex: Salary" : "Ex: Phone Bill",
      type: "text",
    },
    {
      label: "Amount",
      placeholder: "Ex: 5000",
      type: "number",
    },
    {
      label: "Date",
      placeholder: "2024-01-01",
      type: "date",
    },
  ];

  const optionData =
    section === "income"
      ? [
          "Employment income",
          "Business profits",
          "Side hustle",
          "Investment profits",
          "Other",
        ]
      : ["Food", "Clothing", "Utilities", "Transportation", "Other"];

  const handleFormSubmit = (data: FormData, e: handleFormSubmitType) => {
    e.preventDefault();

    if (edit) {
      data.id = edit;
      setIncomesExpenses({
        type: section === "income" ? "edit_income" : "edit_expense",
        payload: data,
      });
      cancelEdit();
    } else {
      data.id = Date.now();
      setIncomesExpenses({
        type: section === "income" ? "add_income" : "add_expense",
        payload: data,
      });
    }
  };

  const handleDelete = (e: handleDeleteType, id: number) => {
    setIncomesExpenses({
      type: section === "income" ? "delete_income" : "delete_expense",
      payload: id,
    });
  };

  const zodSchema: ZodType<ZodFormData> = z
    .object({
      source: z.string().min(1).max(30),
      amount: z.number().min(1),
      date: z.string().min(1),
      category: z.string(),
    })
    .refine((data) => data.category !== "Select...", {
      message: "Please select a category",
      path: ["category"],
    })
    .superRefine((val, ctx) => {
      if (section === "expense" && balance - val.amount <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 3,
          type: "number",
          inclusive: true,
          message: "Balance can not be negative",
          path: ["amount"],
        });
      }
    });

  const handleEdit = (e: handleEditType, data: IncExpData) => {
    console.log(data);
    const sourceInput = document.getElementById(
      `${section}-source`
    ) as HTMLInputElement;
    const amountInput = document.getElementById(
      `${section}-amount`
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      `${section}-date`
    ) as HTMLInputElement;
    const categoryInput = document.getElementById(
      `${section}-category`
    ) as HTMLSelectElement;

    if (sourceInput && amountInput && dateInput && categoryInput) {
      sourceInput.value = data.source;
      amountInput.value = data.amount.toString();
      dateInput.value = data.date;
      categoryInput.value = data.category;

      categoryInput.focus();
      dateInput.focus();
      amountInput.focus();
      sourceInput.focus();

      setEdit(data.id);
    }
  };

  const cancelEdit = () => {
    const sourceInput = document.getElementById(
      `${section}-source`
    ) as HTMLInputElement;
    const amountInput = document.getElementById(
      `${section}-amount`
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      `${section}-date`
    ) as HTMLInputElement;
    const categoryInput = document.getElementById(
      `${section}-category`
    ) as HTMLSelectElement;

    if (sourceInput && amountInput && dateInput && categoryInput) {
      sourceInput.value = "";
      amountInput.value = "";
      dateInput.value = "";
      categoryInput.value = "Select...";

      categoryInput.focus();
      dateInput.focus();
      amountInput.focus();
      sourceInput.focus();
      setEdit(0);
    }
  };

  return (
    <div className="incomeExpense__wrap">
      <h1>{section === "income" ? "Income" : "Expense"}</h1>
      {edit ? (
        <button
          className="cancelEdit"
          onClick={(e) => {
            cancelEdit();
          }}
        >
          Cancel Edit
        </button>
      ) : (
        ""
      )}
      <Form
        formData={formData}
        handleFormSubmit={handleFormSubmit}
        optionData={optionData}
        zodSchema={zodSchema}
        section={section}
      />
      <DataRenderer
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        dataToRender={dataToRender}
      />
    </div>
  );
}
