import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { PropsSelect } from "../../lib/props";

type Props<T extends FieldValues> = UseControllerProps<T> & PropsSelect;

const SelectBox = <T extends FieldValues>(props: Props<T>) => {
  const { name, options, placeholder, control, rules, disabled } = props;
  const { field, fieldState } = useController<T>({ name, control, rules });
  const { error } = fieldState;

  return (
    <>
      <p>{error ? error.message : ''}</p>
      <select
        {...field}
        disabled={disabled}
      >
        { placeholder && <option value='' hidden>{ placeholder }</option>}
        {options.map((option, index) => (
          <option value={option.value} key={index}>{ option.label }</option>
        ))}
      </select>
    </>
  );
};

export default SelectBox