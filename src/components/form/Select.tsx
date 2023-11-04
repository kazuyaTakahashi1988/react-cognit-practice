import { PropsSelect } from "../../lib/props";

type Props = PropsSelect;

const Select = ({ register, options, errors, name, placeholder, ...rest }: Props) => {
  return (
    <>
      <select
        {...register(name, {
          required: { value: true, message: '必須項目です。' },
        })}
        {...rest}
      >
        { placeholder && <option value='' hidden>{ placeholder }</option>}
        {options.map((option, index) => (
          <option
            value={option.value}
            key={index}
          >
            {option.label}
          </option>
        ))}
      </select>
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default Select;