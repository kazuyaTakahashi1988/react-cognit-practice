/* -------------------------------------------------------
    ▽ 型定義 (コンポーネント編) ▽
---------------------------------------------------------- */

import { UseFormRegister } from "react-hook-form";
import { TypeTodoExample } from ".";

// Layout
export type TypeLayout = {
  type: string;
  children?: React.ReactNode;
};

// Header
export type TypeHeader = {
  type: string;
};

// Label
export type TypeLabel = {
  label: {
    text: string;
    required?: boolean;
  };
};

// ErrorMessage
export type TypeErrorMessage = {
  errorMessage: string;
};

// Input
export type TypeInput = {
  label?: {
    text: string;
    required?: boolean;
  };
  errorMessage?: string;
};

// TodoItems
export type TypeTodoItems = {
  itemsName: {
    checkBoxName: string;
    inputName: string;
  };
  onAppend?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onRemove?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  fields: Array<object & { id: string }>;
  register: UseFormRegister<TypeTodoExample>;
  errors?: object;
};

// CheckBox
export type TypeCheckBox = {
  label?: {
    text: string;
    required?: boolean;
  };
  options: Array<{
    value: string;
    label: string;
  }>;
  errorMessage?: string;
};

// RadioButton
export type TypeRadioButton = {
  label?: {
    text: string;
    required?: boolean;
  };
  options: Array<{
    value: string;
    label: string;
  }>;
  errorMessage?: string;
};

// SwitchButton
export type TypeSwitchButton = {
  label?: {
    text: string;
    required?: boolean;
  };
  options: Array<{
    value: string;
    label: string;
    labelActived?: string;
  }>;
  errorMessage?: string;
};

// Select
export type TypeSelect = {
  label?: {
    text: string;
    required?: boolean;
  };
  options: Array<{
    value: string;
    label: string;
  }>;
  errorMessage?: string;
  placeholder?: string;
};

// SelectCustom
export type TypeSelectCustom = {
  label?: {
    text: string;
    required?: boolean;
  };
  options: Array<{
    value: string;
    label: string;
  }>;
  errorMessage?: string;
};

// TextArea
export type TypeTextArea = {
  label?: {
    text: string;
    required?: boolean;
  };
  errorMessage?: string;
};

// Button
export type TypeButton = {
  children?: React.ReactNode;
};

// Modal
export type TypeModal = {
  title: string;
  onEvent?: {
    text: string;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  };
  onClose: {
    text?: string;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  };
  children?: React.ReactNode;
};

// Accordion
export type TypeAccordion = {
  title: string;
  children?: React.ReactNode;
  initOpen?: boolean;
};

// DropdownMenu
export type TypeDropdownMenu = {
  menuList: Array<{
    text: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }>;
  children?: React.ReactNode;
};
