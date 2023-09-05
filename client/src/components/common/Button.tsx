import React from "react";

type TButton = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: TButton) {
  return (
    <button
      {...props}
      className={`py-2 px-5 bg-blue-400 rounded-md text-white hover:bg-blue-500 transition-colors ${
        props.className || ""
      }`}
    >
      {props.text}
    </button>
  );
}
