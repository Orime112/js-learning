import React from 'react'
import { useImmer } from 'use-immer'

const UserImmer = () => {
  const [user, setUser] = useImmer({name: ''})

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser((draft) => {
      draft.name = (e.target as any).value
    })
  }

  return (<>
    <div>{user.name}</div>
    <input type="text" onInput={onInputChange} value={user.name}/>
  </>)
}

export default UserImmer
