import { InputProp } from "./types";

export function Input({
  label,
  placeholder,
  type,
  register1,
  error,
  errorName,
  field,
  section,
}: InputProp) {
  return (
    <div className="input__wrap">
      <label htmlFor={label}>{label}:</label>
      {error[errorName] && (
        <span className="error-message">{error[errorName].message}</span>
      )}
      <input
        id={`${section}-${label.toLowerCase()}`}
        type={type}
        placeholder={placeholder}
        {...register1(field ? field : label.toLowerCase(), {
          valueAsNumber: type === "number",
        })}
      />
    </div>
  );
}
