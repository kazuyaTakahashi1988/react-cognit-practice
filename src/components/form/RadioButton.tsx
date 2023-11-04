import { PropsRadioButton } from "../../lib/props";

type Props = PropsRadioButton;

const RadioButton = ({ register, name, errors, options, ...rest }: Props) => {
  return (
    <>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
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

export default RadioButton;