import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./Input";
import { FormData, FormProp } from "./types";

export function Form({
  handleFormSubmit,
  formData,
  optionData,
  zodSchema,
  section,
}: FormProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(zodSchema) });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form__wrap">
        {formData.map((input: FormData) => {
          return (
            <Input
              key={input.label}
              label={input.label}
              placeholder={input.placeholder}
              type={input.type}
              register1={register}
              error={errors}
              errorName={input.field ? input.field : input.label.toLowerCase()}
              field={input.field}
              section={section}
            />
          );
        })}

        {(() => {
          if (optionData) {
            return (
              <div className="input__wrap">
                {" "}
                <label htmlFor="">Category: </label>
                {errors["category"] && (
                  <span className="error-message">
                    {errors["category"].message}
                  </span>
                )}
                <select {...register("category")} id={`${section}-category`}>
                  <option>Select...</option>
                  {optionData.map((option: string) => {
                    return <option key={option}>{option}</option>;
                  })}
                </select>
              </div>
            );
          }
        })()}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
