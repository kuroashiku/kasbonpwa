import { Input } from "@material-tailwind/react";
import { Fragment } from "react";

export default function InputSimple({
  value,
  label,
  name,
  onChange,
  error,
  disabled,
  autoFocus = false,
  maxlength = 100,
}) {
  return (
    <Fragment>
      <Input
        color={error ? "red" : "teal"}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
        maxLength={maxlength}
      />
      {!error ? null : <div className="text-xs text-red-600 text-right">{error}</div>}
    </Fragment>
  );
}
