import { PropsCheckBox } from "../../lib/props";

type Props = PropsCheckBox;

const CheckBox = ({ register, name, errors, options, ...rest }: Props) => {
  return (
    <>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            {...register(name, {
              required: { value: true, message: '必須項目です。' },
            })}
            {...rest}
            id={option.value}
            value={option.value}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default CheckBox;