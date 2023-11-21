import React from 'react'
import { ororoApi } from '../libs/ororoApi'
import { Episode } from '../types/ororo'
import { useOnKeyPress } from '../hooks/useOnKeyPress'
import { useMediaStore } from '../hooks/useMediaStore'
import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'

import { ReactComponent as PlayIcon } from '../assets/play.svg'
import { ReactComponent as PauseIcon } from '../assets/pause.svg'

export const MediaVideoComponent = React.forwardRef<HTMLDivElement, {}>(
  (props, ref) => {
    const { playingShow, playingMovie, setStoreItem } = useMediaStore()
    const [episode, setEpisode] = React.useState<Episode>()
    const isHidden = !playingMovie && (!playingShow || !episode)

    const onClose = React.useCallback(() => {
      setStoreItem('playingMovie', undefined)
      setStoreItem('playingShow', undefined)
    }, [setStoreItem])

    useOnKeyPress({ onBack: onClose, skip: isHidden })

    React.useEffect(() => {
      async function fetchDetails() {
        if (!playingShow) return

        const data = await ororoApi.episode(playingShow.episodeId)

        setEpisode(data)
      }

      fetchDetails()
    }, [playingShow])

    if (isHidden) {
      return null
    }

    return (
      <div
        ref={ref}
        className="fixed w-screen h-screen bg-black z-30 flex justify-center left-0">
        <video
          id="video"
          src={(episode || playingMovie)?.download_url}
          width="100%"
          height="100%"
          poster={(playingShow || playingShow)?.backdrop_url}
          preload="auto"
          // autoPlay
          controls
        />
        <div className="bg-black bg-opacity-60 absolute top-0 left-0 right-0 bottom-0 z-20 flex flex-col justify-between">
          <div className="bg-gray-950 bg-opacity-90 h-[15vh]"></div>
          <div className="bg-gray-950 bg-opacity-90 h-[15vh] flex items-center px-24">
            <PlayIcon height="50%" />
          </div>
        </div>
      </div>
    )
  },
)

export const MediaVideo = () => {
  const { playingMovie, playingShow } = useMediaStore()
  const { ref, focusKey } = useFocusable()

  if (!playingMovie && !playingShow) {
    return null
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <MediaVideoComponent ref={ref} />
    </FocusContext.Provider>
  )
}
