import React, { useEffect, useRef, useState } from 'react'

const LikeButton = () => {
  const [count, setCount] = useState(0)
  const constCount = useRef(0)

  useEffect(() => {
    document.title = count + ''
    constCount.current = count
  }, [count])
  const handleAlert = () => {
    setTimeout(() => {
      alert(constCount.current)
      console.log('触发setTimeout');
    }, 1000)
  }
  return (<>
    <button onClick={() => setCount(count + 1)}>点赞</button>
    <button onClick={handleAlert}>弹出</button>
    <h2>👍{count}</h2>
  </>)
}

export default LikeButton