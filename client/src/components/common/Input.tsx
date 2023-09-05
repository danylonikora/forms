import React from "react";

type TInput = {
  name?: string;
  label?: string;
  style?: "outline" | "stroke" | "borderless";
  multiline?: boolean;
  inputRef?: React.MutableRefObject<any>;
  changeValue?: (newValue: TInput["value"]) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: TInput) {
  let classNameString = "border-stone-500 bg-transparent outline-stone-500";

  switch (props.style) {
    case undefined:
    case "outline":
      classNameString += " border rounded p-1";
      break;
    case "stroke":
      classNameString += " border-b focus:outline-0 py-2 px-1";
      break;
    case "borderless":
      classNameString += " focus:outline-0 py-2 px-1";
  }

  props.className && (classNameString += " " + props.className);

  return (
    <div className="flex flex-col gap-1">
      {props.label &&
      !(props.style == "stroke") &&
      !(props.style == "borderless") ? (
        <label htmlFor={props.name} className="text-basic">
          {props.label}
        </label>
      ) : (
        <></>
      )}
      {props.multiline ? (
        <textarea
          id={props.name}
          name={props.name}
          autoComplete="off"
          placeholder={
            props.style == "stroke" || props.style == "borderless"
              ? props.label
              : ""
          }
          value={props.value}
          onChange={(e) => {
            if (props.changeValue) {
              props.changeValue(e.target.value);
            }
          }}
          className={classNameString}
        />
      ) : (
        <input
          id={props.name}
          name={props.name}
          type={props.type ? props.type : "text"}
          autoComplete="off"
          ref={props.inputRef || null}
          placeholder={
            props.style == "stroke" || props.style == "borderless"
              ? props.label
              : ""
          }
          value={props.value}
          onChange={(e) => {
            if (props.changeValue) {
              props.changeValue(e.target.value);
            }
          }}
          className={classNameString}
        />
      )}
    </div>
  );
}
