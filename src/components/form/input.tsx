import { PropsInput } from "../../lib/props";

type Props = PropsInput;

const Input = ({ register, type, name, placeholder, validations, errors, ...rest }: Props) => {

  return (
    <>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        {...register(name, validations)}
        {...rest}
      />
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default Input;