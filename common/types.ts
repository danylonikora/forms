export type TFormElementTypes = "radio_group" | "text_field";

export type TFormElement = {
  focused: boolean;
  question: string;
  type: TFormElementTypes;
  variants: string[];
  text: string;
};