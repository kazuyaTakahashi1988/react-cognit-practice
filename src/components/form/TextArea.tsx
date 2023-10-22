import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { PropsTextArea } from "../../lib/props";

type Props<T extends FieldValues> = UseControllerProps<T> & PropsTextArea;

const TextArea = <T extends FieldValues>(props: Props<T>) => {
  const { name, placeholder, control, rules, disabled } = props;
  const { field, fieldState } = useController<T>({ name, control, rules });
  const { error } = fieldState;

  return (
    <>
      <p>{error ? error.message : ''}</p>
      <textarea
        placeholder={placeholder}
        {...field}
        disabled={disabled}
        ></textarea>
    </>
  );
};

export default TextArea