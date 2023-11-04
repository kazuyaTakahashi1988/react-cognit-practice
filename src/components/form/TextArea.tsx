import { PropsTextArea } from "../../lib/props";

type Props = PropsTextArea;

const TextArea = ({ register, name, validations, errors, ...rest }: Props) => {
  return (
    <>
      <textarea
        {...register(name, validations)}
        {...rest}
      >
      </textarea>
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default TextArea;