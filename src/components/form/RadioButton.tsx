import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { PropsRadioButton } from "../../lib/props";

type Props<T extends FieldValues> = UseControllerProps<T> & PropsRadioButton;

const RadioButton = <T extends FieldValues>(props: Props<T>) => {
  const { name, type, placeholder, control, rules, disabled } = props;
  const { field, fieldState } = useController<T>({ name, control, rules });
  const { error } = fieldState;

  return (
    <>
      <p>{error ? error.message : ''}</p>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        disabled={disabled}
        />
    </>
  );
};

export default RadioButton