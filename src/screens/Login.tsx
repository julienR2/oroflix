import React from 'react'
import { NavigationProps } from '../types/navigation'
import { ororoApi } from '../libs/ororoApi'

type LoginProps = NavigationProps

const Login = ({ navigate }: LoginProps) => {
  const [email, setEmail] = React.useState('***REMOVED***')
  const [password, setPassword] = React.useState('***REMOVED***')

  const onSubmit = React.useCallback(async () => {
    await ororoApi.login(email, password)

    navigate('home')
  }, [email, password, navigate])

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}

export default Login
