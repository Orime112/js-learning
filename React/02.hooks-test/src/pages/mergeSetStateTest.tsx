import React, { useEffect, useState } from 'react'

const MergeSetStateTest = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }, [])
  return (<div>{count}</div>)
}

export default MergeSetStateTest