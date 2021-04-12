import React, { FC } from 'react'

interface HelloProps {
  title: string;
}

const Hello: FC<HelloProps> = (props) => {
  const { title, children } = props
  return (<>
    <h2>{title}</h2>
  </>)
}

export default Hello