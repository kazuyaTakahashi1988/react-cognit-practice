import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { PropsCheckBox } from "../../lib/props";

type Props<T extends FieldValues> = UseControllerProps<T> & PropsCheckBox;

const CheckBox = <T extends FieldValues>(props: Props<T>) => {
  const { name, options, control, rules } = props;
  const { field, fieldState } = useController<T>({ name, control, rules });
  const { error } = fieldState;

  return (
    <>
      <p>{error ? error.message : ''}</p>
      {options.map((option, index) => (
        <div key={option.id}>
          <input
            id={option.id}
            type="checkbox"
            disabled={option.disabled}
            {...field}
            value={option.id}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default CheckBox