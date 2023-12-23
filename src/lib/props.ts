/* eslint-disable @typescript-eslint/no-explicit-any */
/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// FormExample
export type PropsFormExample = {
  inputName: string;
  checkBoxName: object;
  radioButtonName: string;
  switchButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
};
// TodoExample
export type PropsTodoExample = {
  todoItemsName: {
    check: boolean;
    task: string;
  }[];
};

// PropsSignIn
export type PropsSignIn = {
  email: string;
  password: string;
};

// PropsSignUp
export type PropsSignUp = {
  email: string;
  password: string;
};

// PropsVerification
export type PropsVerification = {
  verificationCode: string;
  email: string;
};

/* -------------------------------------------------------
    ▽ Props の型定義 (コンポーネント編) ▽
---------------------------------------------------------- */
// Layout
export type PropsLayout = {
  type: string | undefined;
  children?: React.ReactNode;
};
// PropsHeader
export type PropsHeader = {
  type: string | undefined;
};

// Label
export type PropsLabel = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
};

// ErrorMessage
export type PropsErrorMessage = {
  errorMessage: string | undefined;
};

// Input
export type PropsInput = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  errors?: object | undefined;
};

// TodoItems
export type PropsTodoItems = {
  itemsName: {
    checkBox: string | undefined;
    input: string | undefined;
  };
  append?: any;
  remove?: any;
  fields?: Array<any>;
  register?: any;
};

// CheckBox
export type PropsCheckBox = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  options: Array<{
    value: string;
    label: string;
  }>;
  errors?: object | undefined;
};

// RadioButton
export type PropsRadioButton = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  options: Array<{
    value: string;
    label: string;
  }>;
  errors?: object | undefined;
};

// SwitchButton
export type PropsSwitchButton = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  options: Array<{
    value: string;
    label: string;
    labelActived: string | undefined;
  }>;
  errors?: object | undefined;
};

// Select
export type PropsSelect = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  options: Array<{
    value: string;
    label: string;
  }>;
  errors?: object | undefined;
};

// SelectCustom
export type PropsSelectCustom = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  options: Array<{
    value: string;
    label: string;
  }>;
  errors?: object | undefined;
};

// TextArea
export type PropsTextArea = {
  label:
    | {
        text: string | undefined;
        required: boolean;
      }
    | undefined;
  errors?: object | undefined;
};

// Button
export type PropsButton = {
  children?: React.ReactNode;
};

// Modal
export type PropsModal = {
  title: string | undefined;
  onEvent:
    | {
        text: string | undefined;
        onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
      }
    | undefined;
  onClose:
    | {
        text: string | undefined;
        onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
      }
    | undefined;
  children?: React.ReactNode;
};

// Accordion
export type PropsAccordion = {
  title: string | undefined;
  children?: React.ReactNode;
  initOpen: boolean;
};

// DropdownMenu
export type PropsDropdownMenu = {
  menuList: Array<{
    text: string | undefined;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }>;
  children?: React.ReactNode;
};
