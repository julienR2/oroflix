import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import React from 'react'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  secondary?: boolean
}

export const Button = ({
  className,
  autoFocus,
  secondary,
  children,
  ...props
}: Props) => {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => {
      ref.current.click()
    },
  })

  React.useEffect(() => {
    if (!autoFocus) return

    focusSelf()
  }, [autoFocus, focusSelf])

  return (
    <button
      {...props}
      ref={ref}
      type="submit"
      className={classNames(
        'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm outline-none',
        {
          'ring-2 ring-inset ring-gray-300': focused,
        },
        secondary ? 'bg-gray-900' : 'bg-gray-800',
        className,
      )}>
      {children}
    </button>
  )
}
