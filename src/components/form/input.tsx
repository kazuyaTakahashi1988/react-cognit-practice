import { PropsInput } from "../../lib/props";

type Props = PropsInput;

const Input = ({ register, type, name, validations, errors, ...rest }: Props) => {
  return (
    <>
      <input
        type={type || 'text'}
        {...register(name, validations)}
        {...rest}
      />
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default Input;