
import { navigateByDirection, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import classNames from "classnames";
import React from "react";

export const Input = ({ className, autoFocus, onFocus, ...props }: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
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
    }
  });

  React.useEffect(() => {
    if (!autoFocus) return

    focusSelf()
  }, [autoFocus, focusSelf])

  React.useEffect(() => {
    if (focused) return

    ref.current.blur()
  }, [ref, focused])

  const onInputFocus = React.useCallback<React.FocusEventHandler<HTMLInputElement>>((event) => {
    focusSelf()
    onFocus?.(event)
  }, [focusSelf, onFocus])

  return <input {...props} onFocus={onInputFocus} ref={ref} className={classNames("block w-full border-0 rounded-md py-1.5 bg-gray-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6", {
    'ring-gray-400': focused
  }, className)} />
}