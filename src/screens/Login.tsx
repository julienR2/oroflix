import React from 'react'
import { NavigationProps } from '../types/navigation'
import { ororoApi } from '../libs/ororoApi'

import logo from '../assets/logo.svg'

type LoginProps = NavigationProps

const Login = ({ navigate }: LoginProps) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
    event.preventDefault()

    await ororoApi.login(email, password)

    navigate('Home')
  }, [email, password, navigate])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pb-[20vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="Oroflix"
        />
        <h2 className="mt-12 text-center text-2xl font-medium leading-9 tracking-tight text-gray-100">
          Sign in to your <a href='https://ororo.tv' className='text-red-700 underline'>Ororo.tv</a> account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
