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
      <div className="w-full max-w-[60vw] min-h-screen bg-gray-950">
        <div className="relative w-full h-[30vh] flex items-end z-10">
          <img
            src={selectedMedia?.backdrop_url}
            alt="backdrop"
            className="-z-10 object-cover h-full w-full absolute top-0 left-0 right-0 bottom-0"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-gray-950 from-0 to-transparent to-20%" />

          <h1 className=" text-gray-200 text-6xl font-bold m-8 max-w-[60%]">
            {selectedMedia?.name}
          </h1>
        </div>
        <FocusContext.Provider value={focusKey}>
          <div className="flex flex-col justify-start m-8" ref={ref}>
            <Button
              className=" w-52"
              secondary
              autoFocus
              onClick={() => onPlay()}>
              Play
            </Button>
            <Button className=" w-52" secondary onClick={onClose}>
              Close
            </Button>
          </div>
        </FocusContext.Provider>
      </div>
    </div>
  )
}
