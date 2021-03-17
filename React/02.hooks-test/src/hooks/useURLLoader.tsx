import React, { useEffect, useState } from 'react'
import { IDogResult } from '../App'

const useURLLoader = (url: string, deps: any[] = []) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<IDogResult | null>()
  useEffect(() => {
    setIsLoading(true)
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const res = xhr.response
          setData(JSON.parse(res))
          setIsLoading(false)
        } else {
          console.log('请求出错');
        }
      }
    }
    xhr.send()
  }, deps)
  return [isLoading, data]
}

export default useURLLoader