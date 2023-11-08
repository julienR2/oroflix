import React from 'react'
import { StoreContext } from '../hooks/useStore'

export const MovieVideo = () => {
  const { playingMovie, setItem } = React.useContext(StoreContext)

  React.useEffect(() => {
    if (!playingMovie) return

    window.addEventListener('keypress', (event) => {})
  }, [playingMovie])

  const onKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLVideoElement>
  >(
    (event) => {
      if (event.key !== 'ESC' && event.key !== 'Escape') return

      setItem('playingMovie', undefined)
    },
    [setItem],
  )

  if (!playingMovie) {
    return null
  }

  return (
    <div className="fixed w-screen h-screen bg-black z-30 flex justify-center">
      <video
        id="video"
        src={playingMovie.download_url}
        width="100%"
        height="100%"
        poster={playingMovie.backdrop_url}
        preload="auto"
        autoPlay
        controls
        autoFocus
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
