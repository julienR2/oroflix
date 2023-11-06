import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import React from 'react'

export const Button = ({
  className,
  autoFocus,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      ref.current.click()
    },
  })

  return (
    <button
      {...props}
      ref={ref}
      type='submit'
      className={classNames(
        'flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        {
          'ring-2 ring-inset ring-gray-100': focused,
        },
        className,
      )}
    >
      Sign in
    </button>
  )
}
