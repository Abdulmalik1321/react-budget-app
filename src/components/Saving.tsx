import { z, ZodType } from "zod";
import { Form } from "./Form";
import { FormData, handleFormSubmitType, ZodFormData } from "./types";

import { useState } from "react";

export function Saving({ totalSaving }: { totalSaving: number }) {
  let localDataString: string | null = localStorage.getItem("target");

  if (!localDataString) {
    localStorage.setItem("target", "1000");
    localDataString = localStorage.getItem("target");
  }

  const [target, setTarget] = useState(Number(localDataString));

  const formData: FormData[] = [
    {
      label: "Set Target",
      placeholder: "Ex: 2500",
      type: "number",
      field: "amount",
    },
  ];

  const handleFormSubmit = (data: any, e: handleFormSubmitType) => {
    localStorage.setItem("target", JSON.stringify(data.amount));
    setTarget(data.amount);
    e.preventDefault();
  };

  const zodSchema: ZodType<ZodFormData> = z.object({
    amount: z.number().min(1),
  });
  return (
    <div className="saving">
      <h1>Saving</h1>
      <Form
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        zodSchema={zodSchema}
      />
      <p>Current saving: {totalSaving.toLocaleString()}</p>
      <p>Target: {target.toLocaleString()}</p>
      <p>
        Progress:{" "}
        {((totalSaving / target) * 100).toFixed(2).toLocaleString() !== "NaN"
          ? ((totalSaving / target) * 100).toFixed(2).toLocaleString()
          : 0}
        %
      </p>
      <progress
        value={(totalSaving / target) * 100 ? (totalSaving / target) * 100 : 0}
        max="100"
      >
        {" "}
        32%{" "}
      </progress>
    </div>
  );
}
