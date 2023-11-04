import { PropsTextArea } from "../../lib/props";

type Props = PropsTextArea;

const TextArea = ({ register, name, placeholder, validations, errors, ...rest }: Props) => {
  return (
    <>
      <textarea
        placeholder={placeholder}
        {...register(name, validations)}
        {...rest}
      >
      </textarea>
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default TextArea;