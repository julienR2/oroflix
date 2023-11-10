import React from 'react'
import { NavigationProps } from '../types/navigation'
import { ororoApi } from '../libs/ororoApi'

import logo from '../assets/logo.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

type LoginProps = NavigationProps

const Login = ({ navigate, loading, setLoading }: LoginProps) => {
  const [email, setEmail] = React.useState('***REMOVED***')
  const [password, setPassword] = React.useState('***REMOVED***')

  React.useEffect(() => {
    setLoading(false)
  }, [setLoading])

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event?.preventDefault()

      if (loading) return

      setLoading(true)

      try {
        await ororoApi.login(email, password)

        navigate('Home')
      } catch (error) {
        setLoading(false)
      }
    },
    [email, password, navigate, setLoading, loading],
  )

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pb-[20vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="Oroflix"
          loading="lazy"
        />
        <h2 className="mt-12 text-center text-2xl font-medium leading-9 tracking-tight text-gray-100">
          Sign in to your{' '}
          <a href="https://ororo.tv" className="text-red-700 underline">
            Ororo.tv
          </a>{' '}
          account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-100">
                Password
              </label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
