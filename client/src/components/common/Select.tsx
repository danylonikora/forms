import React from "react";

type TSelect = {
  label: string;
  data: object;
  changeValue?: (newValue: string | number) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: TSelect) {
  const dataKeys = Object.keys(props.data);
  const dataValues = Object.values(props.data);

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={props.name} className="text-basic">
        {props.label}
      </label>
      <select
        name={props.name}
        value={props.value}
        onChange={(e) => {
          if (props.changeValue) {
            props.changeValue(e.target.value);
          }
        }}
        className="border border-black rounded p-1"
      >
        {dataKeys.map((key, i) => (
          <option key={key} value={key}>
            {dataValues[i]}
          </option>
        ))}
      </select>
    </div>
  );
}
