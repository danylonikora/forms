import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { TFormElementTypes, TFormElement } from "../../../common/types";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Select from "../components/common/Select";

const formElements: { [Property in TFormElementTypes]: string } = {
  radio_group: "Select one from given options",
  text_field: "Text field",
};

export default function CreateFormPage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [elements, setElements] = React.useState<TFormElement[]>([
    {
      focused: false,
      question: "",
      type: "radio_group",
      variants: [""],
      text: "",
    },
  ]);

  const titleInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  function changeElements<T extends keyof TFormElement>(
    field: T,
    newValue: TFormElement[T],
    i: number,
    nextModifierFn?: (next: TFormElement[]) => TFormElement[]
  ) {
    setElements((prev) => {
      let next = [...prev];
      if (nextModifierFn) {
        next = nextModifierFn(next);
      }
      next[i][field] = newValue;
      return next;
    });
  }
  return (
    <div className="px-40">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <Input
          name="title"
          label="Title"
          value={title}
          changeValue={(newValue: any) => setTitle(String(newValue))}
          style="stroke"
          className="self-stretch py-5 text-xl border-b-2 font-semibold"
          inputRef={titleInputRef}
        />
        <Input
          name="description"
          label="Description"
          value={description}
          changeValue={(newValue: any) => setDescription(String(newValue))}
          style="stroke"
          multiline
          className="self-stretch"
        />
        {elements.map((e, i) => (
          <FormElement
            data={e}
            changeFocused={() => {
              changeElements("focused", true, i, (next) => {
                return next.map((el) => {
                  el.focused = false;
                  return el;
                });
              });
            }}
            changeQuestion={(newValue) => {
              changeElements("question", newValue, i);
            }}
            changeType={(newValue) => {
              changeElements("type", newValue, i);
            }}
            changeVariants={(newValue) => {
              changeElements("variants", newValue, i);
            }}
            changeText={(newValue) => {
              changeElements("text", newValue, i);
            }}
          />
        ))}
        <Button
          text="Add question"
          onClick={() =>
            setElements((prev) => {
              let next = prev.map((el) => {
                el.focused = false;
                return el;
              });
              next.push({
                focused: true,
                question: "",
                type: "radio_group",
                variants: [""],
                text: "",
              });
              return next;
            })
          }
        />
      </form>
    </div>
  );
}

type TFormElementProps = {
  data: TFormElement;
  changeFocused: () => void;
  changeQuestion: (newValue: TFormElement["question"]) => void;
  changeType: (newValue: TFormElement["type"]) => void;
  changeVariants: (newValue: TFormElement["variants"]) => void;
  changeText: (newValue: TFormElement["text"]) => void;
};

function FormElement(props: TFormElementProps) {
  const questionInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (props.data.focused && questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, [props.data.focused]);

  return (
    <div
      className="flex flex-col gap-2 rounded-lg overflow-hidden border border-stone-2700 [&>*]:px-5 [&>*:last-child]:mb-2"
      onClick={() => props.changeFocused()}
    >
      <div className="bg-stone-200">
        <Input
          name="question"
          label="Question"
          style="borderless"
          inputRef={questionInputRef}
          value={props.data.question}
          changeValue={(newValue: any) => {
            props.changeQuestion(String(newValue));
          }}
        />
      </div>
      {props.data.focused && (
        <Select
          label="Type"
          value={props.data.type}
          changeValue={(newValue: any) => {
            props.changeType(newValue as TFormElementTypes);
          }}
          data={formElements}
        />
      )}
      {props.data.type === "radio_group" && (
        <RadioGroupElement
          focused={props.data.focused}
          variants={props.data.variants}
          changeVariants={(newValue) => props.changeVariants(newValue)}
        />
      )}
      {props.data.type === "text_field" && (
        <Input
          value={props.data.text}
          changeValue={(newValue: any) => props.changeText(String(newValue))}
          multiline
          style="stroke"
        />
      )}
    </div>
  );
}

type TRadioGroupElementProps = Pick<TFormElement, "focused" | "variants"> & {
  changeVariants: (newValue: TFormElement["variants"]) => void;
};

function RadioGroupElement(props: TRadioGroupElementProps) {
  function changeVariant(i: number, newValue: TFormElement["variants"][0]) {
    const tmp = [...props.variants];
    tmp[i] = newValue;
    props.changeVariants(tmp);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {props.variants.map((v, i) => {
        return (
          <div className="flex gap-2">
            <input type="radio" disabled />
            <Input
              style={props.focused ? "stroke" : "borderless"}
              value={v}
              changeValue={(newValue: any) =>
                changeVariant(i, String(newValue))
              }
            />
            {props.focused && props.variants.length > 1 && (
              <XMarkIcon
                title="Remove variant"
                className="h-6 w-6 cursor-pointer self-center text-stone-500"
                onClick={() =>
                  props.changeVariants([
                    ...props.variants.slice(0, i),
                    ...props.variants.slice(i + 1),
                  ])
                }
              />
            )}
          </div>
        );
      })}
      {props.focused && (
        <Button
          text="Add variant"
          onClick={() => props.changeVariants([...props.variants, ""])}
        />
      )}
    </div>
  );
}
