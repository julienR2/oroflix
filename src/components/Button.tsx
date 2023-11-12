import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import React from 'react'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  secondary?: boolean
  onFocus?: () => void
}

export const Button = ({
  className,
  autoFocus,
  secondary,
  children,
  onFocus,
  ...props
}: Props) => {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => {
      ref.current.click()
    },
    onFocus: () => {
      onFocus?.()
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
        'flex w-full justify-center rounded-md p-3 font-semibold leading-6 text-gray-200 shadow-sm outline-none px-8 py-4',
        {
          'ring-2 ring-inset ring-gray-300': focused,
        },
        secondary
          ? 'bg-gray-900 min-w-[10em] whitespace-nowrap'
          : 'bg-gray-800',
        className,
      )}>
      {children}
    </button>
  )
}
