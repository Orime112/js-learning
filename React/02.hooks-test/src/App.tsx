import React, { useState } from 'react'
import Clock from './Clock'
import Hello from './Hello'
import MouseTracker from './MouseTracker'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

import LikeButton from './LikeButton'

export interface IDogResult {
  message: string;
  status: string;
}

const App = () => {
  const [ showTracker, setShowTracker ] = useState(true)

  // * 使用自定义hook
  const position = useMousePosition()
  const [isLoading, data] = useURLLoader('https://dog.ceo/api/breeds/image/random', [showTracker])

  const dogResult = data as IDogResult
  console.log(dogResult, 'dogres', dogResult?.message);

  return (<>
    <div>App组件页面</div>
    <Clock />
    <Hello title="test" />
    <LikeButton />
    {/* { showTracker && <MouseTracker />} */}
    { showTracker && <div>{`x:${position.x};y:${position.y}`}</div>}
    <button onClick={() => setShowTracker(!showTracker)}>Toggle Tracker</button>
    {isLoading ? <p>🐶加载中</p> : <img style={{width: '50%', display: 'block'}} src={dogResult && dogResult.message} />}
  </>)
}

export default App