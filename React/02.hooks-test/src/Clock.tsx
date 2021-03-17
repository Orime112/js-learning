import React, { useState, useEffect, FC } from 'react'

const Clock = () => {
  const [time, setTime] = useState<Date>(new Date())
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timerId)
    };
  }, []);
  return (<div style={{display: 'flex', alignItems: 'flex-end'}}>
    <h3>档期日期和时间：</h3>
    <div>{time.toLocaleString()}</div>
  </div>)
}

export default Clock