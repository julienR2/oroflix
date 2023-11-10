import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StoreContext } from '../hooks/useStore'
import { Button } from './Button'
import { Movie, Show, ShowShort } from '../types/ororo'
import { ororoApi } from '../libs/ororoApi'
import {
  FocusContext,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import { Preview } from './Preview'

export const MediaDetail = () => {
  const { focusedMedia, selectedMedia, setItem } =
    React.useContext(StoreContext)
  const [show, setShow] = React.useState<Show>()
  const [movie, setMovie] = React.useState<Movie>()

  const onClose = React.useCallback(() => {
    setItem('selectedMedia', undefined)
    setFocus(`${focusedMedia?.id}`)
  }, [setItem, focusedMedia?.id])

  const onPlay = React.useCallback(
    (episodeId?: number) => {
      if (episodeId && show) {
        setItem('playingShow', { ...show, episodeId })
      }

      setItem('playingMovie', movie)
    },
    [setItem, show, movie],
  )

  const { ref, focusKey } = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
  })

  React.useEffect(() => {
    async function fetchDetail() {
      if (!selectedMedia) return

      if ((selectedMedia as ShowShort)?.myshows_id) {
        const data = await ororoApi.show(selectedMedia.id)
        setShow(data)

        return
      }

      const data = await ororoApi.movie(selectedMedia.id)
      setMovie(data)
    }

    fetchDetail()
  }, [selectedMedia])

  if (!selectedMedia) {
    return null
  }

  return (
    <div className="fixed w-screen h-screen bg-gray-950 bg-opacity-90 z-20 flex justify-center">
      <div className="w-full max-w-[60vw] bg-gray-950 m-8 rounded-lg overflow-hidden flex flex-col">
        <Preview className=" h-auto" contentClassName="max-w-none" />
        <div className="flex-1 overflow-scroll">
          <FocusContext.Provider value={focusKey}>
            <div className="flex flex-col justify-start mx-8" ref={ref}>
              <Button
                className="max-w-xs mb-4"
                secondary
                autoFocus
                onClick={() => onPlay()}>
                Play
              </Button>
              <Button className="max-w-xs" secondary onClick={onClose}>
                Close
              </Button>
            </div>
          </FocusContext.Provider>
        </div>
      </div>
    </div>
  )
}
