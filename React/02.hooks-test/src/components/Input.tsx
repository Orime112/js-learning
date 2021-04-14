import React, { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'> {
  // defaultValue?: string;
  maxLength?: number;

}

function MyInput(Iprops: InputProps) {
  const { defaultValue, ...restProps } = Iprops
  return (<>
    <input {...Iprops} type="text" />
    <span>{ }</span>
  </>)
}

export default MyInput