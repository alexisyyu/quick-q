import React from "react";
import { TextFieldFormElement } from "@/components/fields/TextField";
import { NumberFieldFormElement } from "@/components/fields/NumberField";
import { TextareaFieldFormElement } from "@/components/fields/TextareaField";
import { DateFieldFormElement } from "@/components/fields/DateField";
import { SelectFieldFormElement } from "@/components/fields/SelectField";
import { CheckboxFieldFormElement } from "@/components/fields/CheckboxField";

import { TitleFieldFormElement } from "@/components/fields/TitleField";
import { SubTitleFieldFormElement } from "@/components/fields/SubTitleField";
import { ParagraphFieldFormElement } from "@/components/fields/ParagraphField";
import { SeparatorFieldFormElement } from "@/components/fields/SeparatorField";

import { EmptyFieldFormElement } from "@/components/fields/EmptyField";

export type ElementsType =
  | "TextField"
  | "NumberField"
  | "TextareaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "EmptyField";

export type SubmitFunction = (key: string, value: string) => void;

export type designerBtnElementType = {
  icon: React.ElementType;
  label: string;
};

export type designerComponentType = {
  elementInstance?: FormElementInstance;
  elementInstanceHeight?: string;
};

export type FormComponentType = {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isValid?: boolean;
  defaultValue?: string;
};

export type PropertiesComponentType = {
  elementInstance: FormElementInstance;
};

export type ValidateFunction = (
  formElement: FormElementInstance,
  currentValue: string
) => boolean;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: designerBtnElementType;

  designerComponent: React.FC<designerComponentType>; // for designing

  formComponent: React.FC<FormComponentType>; // for form filling

  propertiesComponent: React.FC<PropertiesComponentType>; // for properties panel

  validate: ValidateFunction;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,

  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  EmptyField: EmptyFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
};
