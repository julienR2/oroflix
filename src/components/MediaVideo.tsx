import React from 'react'
import { StoreContext } from '../hooks/useStore'
import { ororoApi } from '../libs/ororoApi'
import { Episode } from '../types/ororo'

export const MediaVideo = () => {
  const { playingShow, playingMovie } = React.useContext(StoreContext)
  const [episode, setEpisode] = React.useState<Episode>()

  React.useEffect(() => {
    async function fetchDetails() {
      if (!playingShow) return

      const data = await ororoApi.episode(playingShow.episodeId)

      setEpisode(data)
    }

    fetchDetails()
  }, [playingShow])

  if (!playingMovie && (!playingShow || !episode)) {
    return null
  }

  return (
    <div className="fixed w-screen h-screen bg-black z-30 flex justify-center">
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
