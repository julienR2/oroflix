import React from 'react'
import { ororoApi } from '../libs/ororoApi'
import { Episode } from '../types/ororo'
import { useOnKeyPress } from '../hooks/useOnKeyPress'
import { useMediaStore } from '../hooks/useMediaStore'

export const MediaVideoComponent = () => {
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
    <div className="fixed w-screen h-screen bg-black z-30 flex justify-center left-0">
      <video
        id="video"
        src={(episode || playingMovie)?.download_url}
        width="100%"
        height="100%"
        poster={(playingShow || playingShow)?.backdrop_url}
        preload="auto"
        autoPlay
        controls
      />
    </div>
  )
}

export const MediaVideo = () => {
  const { playingMovie, playingShow } = useMediaStore()

  if (!playingMovie && !playingShow) {
    return null
  }

  return <MediaVideoComponent />
}
