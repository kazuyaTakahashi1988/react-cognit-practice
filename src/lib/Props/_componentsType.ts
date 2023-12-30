/* -------------------------------------------------------
    ▽ Props の型定義 (コンポーネント編) ▽
---------------------------------------------------------- */
// Layout
export type PropsLayout = {
  type: string;
  children?: React.ReactNode;
};

// PropsHeader
export type PropsHeader = {
  type: string;
};

// Label
export type PropsLabel = {
  label: {
    text: string;
    required?: boolean;
  };
};

// ErrorMessage
export type PropsErrorMessage = {
  errorMessage: string;
};

// Input
export type PropsInput = {
  label?: {
    text: string;
    required?: boolean;
  };
  errors?: object;
};

// TodoItems
export type PropsTodoItems = {
  itemsName: {
    checkBoxName: string;
    inputName: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  append: any;
  remove: (index?: number | number[]) => void;
  fields: Array<object & { id: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
};

// CheckBox
export type PropsCheckBox = {
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
export type PropsRadioButton = {
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
export type PropsSwitchButton = {
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
export type PropsSelect = {
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

// SelectCustom
export type PropsSelectCustom = {
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
export type PropsTextArea = {
  label?: {
    text: string;
    required?: boolean;
  };
  errors?: object;
};

// Button
export type PropsButton = {
  children?: React.ReactNode;
};

// Modal
export type PropsModal = {
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
export type PropsAccordion = {
  title: string;
  children?: React.ReactNode;
  initOpen?: boolean;
};

// DropdownMenu
export type PropsDropdownMenu = {
  menuList: Array<{
    text: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }>;
  children?: React.ReactNode;
};
