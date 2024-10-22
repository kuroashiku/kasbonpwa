import { Input } from "@material-tailwind/react";
import { formatBackToNumber } from "../util/formatter";
import { Fragment } from "react";

export default function InputNumber(
  props = { value: "", label: "", name: "", onChange: () => {}, currency: "", error: "", disabled: false, icon: "" }
) {
  const handleChange = (e) => {
    e.target.value = formatBackToNumber(e.target.value);
    props.onChange(e);
  };

  return (
    <Fragment>
      <Input
        color={props.error ? "red" : "teal"}
        value={props.value || ""}
        label={props.label}
        name={props.name}
        onChange={handleChange}
        disabled={props.disabled}
        icon={props.icon}
      />
      {!props.error ? null : <div className="text-xs text-red-600 text-right">{props.error}</div>}
    </Fragment>
  );
}
