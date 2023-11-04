import { PropsTextArea } from "../../lib/props";

type Props = PropsTextArea;

const TextArea = ({ register, name, errors, ...rest }: Props) => {
  return (
    <>
      <textarea
        {...register(name,{
          required: { value: true, message: '必須項目です。' },
        })}
        {...rest}
      >
      </textarea>
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}

export default TextArea;