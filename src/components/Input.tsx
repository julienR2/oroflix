import {
  navigateByDirection,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import React from 'react'

export const Input = ({
  className,
  autoFocus,
  onFocus,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const { ref, focused, focusSelf } = useFocusable({
    onArrowPress: (dir) => {
      ref.current.blur()
      navigateByDirection(dir, {})
      return false
    },

    onEnterPress: () => {
      if (document.activeElement === ref.current) {
        navigateByDirection('down', {})
        return
      }

      ref.current.focus()
    },
  })

  React.useEffect(() => {
    if (!autoFocus) return

    focusSelf()
  }, [autoFocus, focusSelf])

  React.useEffect(() => {
    if (focused) return

    ref.current.blur()
  }, [ref, focused])

  const onInputFocus = React.useCallback<
    React.FocusEventHandler<HTMLInputElement>
  >(
    (event) => {
      focusSelf()
      onFocus?.(event)
    },
    [focusSelf, onFocus],
  )

  return (
    <input
      {...props}
      onFocus={onInputFocus}
      ref={ref}
      style={{
        fontSize: 'inherit',
        ...props.style,
      }}
      className={classNames(
        'block w-full border-0 rounded-md p-3 bg-gray-900 ring-2 ring-inset text-gray-100 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400',
        {
          'ring-gray-800': !focused,
          'ring-4 ring-gray-300': focused,
        },
        className,
      )}
    />
  )
}
