import { useState } from "react";
import { z, ZodType } from "zod";

import { Form } from "./Form";
import {
  FormData,
  BalanceProps,
  handleFormSubmitType,
  ZodFormData,
} from "./types";

export function Balance({
  totalExpense,
  totalIncome,
  totalSaving,
  setTotalSaving,
}: BalanceProps) {
  const balance: number = totalIncome - totalExpense - totalSaving;

  const handleFormSubmit1 = (data: any, e: handleFormSubmitType) => {
    e.preventDefault();
    localStorage.setItem("saving", JSON.stringify(totalSaving + data.amount));
    setTotalSaving({
      type: "setTotalSaving",
      payload: totalSaving + data.amount,
    });
  };

  const handleFormSubmit2 = (data: any, e: handleFormSubmitType) => {
    e.preventDefault();
    localStorage.setItem("saving", JSON.stringify(totalSaving - data.amount));
    setTotalSaving({
      type: "setTotalSaving",
      payload: totalSaving - data.amount,
    });
  };

  const formData1: FormData[] = [
    {
      label: "Transfer",
      placeholder: "Ex: 2000",
      type: "number",
      field: "amount",
    },
  ];

  const formData2: FormData[] = [
    {
      label: "Retrieve",
      placeholder: "Ex: 2000",
      type: "number",
      field: "amount",
    },
  ];

  const zodSchema1: ZodType<ZodFormData> = z
    .object({
      amount: z.number().min(1),
    })
    .refine((data) => balance - data.amount >= 0, {
      message: "Balance can not be negative",
      path: ["amount"],
    });

  const zodSchema2: ZodType<ZodFormData> = z
    .object({
      amount: z.number().min(1),
    })
    .refine((data) => totalSaving - data.amount >= 0, {
      message: "Current saving can not be negative",
      path: ["amount"],
    });

  return (
    <div className="balance">
      <h1>Balance</h1>
      <h2>Your Balance: {balance.toLocaleString()}</h2>
      <p>Transfer and retrieve to/from saving account ⤵️</p>
      <Form
        formData={formData1}
        handleFormSubmit={handleFormSubmit1}
        // handleInputChange={handleInputChange}
        zodSchema={zodSchema1}
      />
      <Form
        formData={formData2}
        handleFormSubmit={handleFormSubmit2}
        // handleInputChange={handleInputChange}
        zodSchema={zodSchema2}
      />
    </div>
  );
}
