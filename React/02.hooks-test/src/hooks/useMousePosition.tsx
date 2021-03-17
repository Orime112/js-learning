import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('useEffect called');
    const updateMouse = (e: MouseEvent) => {
      console.log('inner');
      setPosition({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('click', updateMouse)
    return () => {
      console.log('remove effect')
      // * 清空的时候还会执行一下 updateMouse
      document.removeEventListener('click', updateMouse) // todo 清除订阅之后就不会 render 多次了
    }
  }, []) // ! 不依赖就只执行一次；依赖不能乱加，position就不应该加进来

  return position
}

export default useMousePosition