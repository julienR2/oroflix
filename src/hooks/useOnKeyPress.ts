import React from 'react'

const BACK_KEY = 'XF86Back'

type Params = {
  onUp?: () => void
  onDown?: () => void
  onRight?: () => void
  onLeft?: () => void
  onBack?: () => void
}

export const useOnKeyPress = (params: Params) => {
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        params.onUp?.()
      }
      if (event.key === 'ArrowDown') {
        params.onDown?.()
      }
      if (event.key === 'ArrowLeft') {
        params.onLeft?.()
      }
      if (event.key === 'ArrowRight') {
        params.onRight?.()
      }
      if (event.key === BACK_KEY || event.key === 'Backspace') {
        params.onBack?.()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [params])
}
