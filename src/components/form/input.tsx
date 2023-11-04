import { PropsInput } from "../../lib/props";

type Props = PropsInput;

const Input = ({ register, type, name, errors, ...rest }: Props) => {
  return (
    <>
      <input
        type={type || 'text'}
        {...register(name,{
          required: { value: true, message: '必須項目です。' },
        })}
        {...rest}
      />
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default Input;