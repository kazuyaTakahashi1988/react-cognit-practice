import React from "react";
import { useForm } from "react-hook-form";

export function Form({ defaultValues, children, onSubmit }: any) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ defaultValues });
  console.log(errors.firstName);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <p>◇◇◇{errors && 'AAA'}◇◇◇</p>
      {Array.isArray(children)
        ? children.map((child) => {
          return child.props.name
            ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                key: child.props.name,
                errors,
              }
            })
            : child;
        })
        : children}
    </form>
  );
}

export function Input({ register, name, errors, ...rest }: any) {
  return (
    <>
      <input
        {...register(name,{
          required: { value: true, message: '必須項目です。' },
        })}
        {...rest}
      />
      <p>◇◇◇{errors[name] && errors[name].message}◇◇◇</p>
    </>
  );
}
export function CheckBox({ register, name, options, ...rest }: any) {
  return (
    <>
      {options.map((option: string, index: string) => (
        <input type="checkbox" {...register(name)} {...rest} value={option} key={index} />
      ))}
    </>
  );
}

export function Select({ register, options, name, ...rest }: any) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: string, index: string) => (
        <option value={value} key={index}>{value}</option>
      ))}
    </select>
  );
}
