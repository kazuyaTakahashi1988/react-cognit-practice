import React, { forwardRef } from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  label?: string
  name: string
  errorMessage?: string
}

export const TextFieldComponent: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { className, label, errorMessage, ...rest } = props

  return (
    <div className={className}>
      {label && <span>{label}</span>}
      <input  ref={ref} {...rest} />
      {errorMessage && (
        <span>{errorMessage}</span>
      )}
    </div>
  )
}

TextFieldComponent.displayName = 'TextField'

export const TextField = forwardRef(TextFieldComponent)