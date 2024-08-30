/* -------------------------------------------------------
    ▽ 型定義 (コンポーネント編) ▽
---------------------------------------------------------- */

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
  errors?: object;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
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
  errors?: object;
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
  errors?: object;
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
  errors?: object;
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
  errors?: object;
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
  errors?: object;
};

// TextArea
export type TypeTextArea = {
  label?: {
    text: string;
    required?: boolean;
  };
  errors?: object;
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
