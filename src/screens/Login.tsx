import React from 'react'
import { NavigationProps } from '../types/navigation'
import { ororoApi } from '../libs/ororoApi'

import logo from '../assets/logo.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

type LoginProps = NavigationProps

const Login = ({ navigate, loading, setLoading }: LoginProps) => {
  const [email, setEmail] = React.useState('julien.rougeron@gmail.com')
  const [password, setPassword] = React.useState('lotus456')

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
    <div className="flex min-h-full flex-1 flex-col justify-center pb-[20vh] items-center">
      <div className="max-w-lg">
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="Oroflix"
          loading="lazy"
        />
        <h2 className="mt-12 text-center font-medium leading-9 tracking-tight text-gray-100 text-4xl">
          Sign in to your{' '}
          <a href="https://ororo.tv" className="text-red-700 underline">
            Ororo.tv
          </a>{' '}
          account
        </h2>

        <form
          className="space-y-10 mt-14"
          action="#"
          method="POST"
          onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block font-medium leading-6 text-gray-100">
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
                className="block font-medium leading-6 text-gray-100">
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
