import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StoreContext } from '../hooks/useStore'
import { Button } from './Button'
import { Movie, Show, ShowShort } from '../types/ororo'
import { ororoApi } from '../libs/ororoApi'
import {
  FocusContext,
  FocusHandler,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import { Preview } from './Preview'
import { useOnKeyPress } from '../hooks/useOnKeyPress'
import { groupBy } from 'lodash'
import { Episode } from './Episode'

export const MediaDetail = () => {
  const { focusedMedia, selectedMedia, setItem } =
    React.useContext(StoreContext)
  const [show, setShow] = React.useState<Show>()
  const [movie, setMovie] = React.useState<Movie>()
  const [selectedSeason, setSelectedSeason] = React.useState<string>()
  const scrollRef = React.useRef<HTMLDivElement | null>(null)

  const episodesBySeason = React.useMemo(() => {
    if (!show) return

    return groupBy(show.episodes, 'season')
  }, [show])

  const onClose = React.useCallback(() => {
    setItem('selectedMedia', undefined)
    setFocus(`${focusedMedia?.id}`)
  }, [setItem, focusedMedia?.id])

  useOnKeyPress({ onBack: onClose })

  const onPlay = React.useCallback(
    (episodeId?: number) => {
      if (episodeId && show) {
        setItem('playingShow', { ...show, episodeId })
      }

      setItem('playingMovie', movie)
    },
    [setItem, show, movie],
  )

  const { ref, focusKey, focusSelf } = useFocusable({
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

  const onSeasonSelect = React.useCallback(
    (id?: string) => () => {
      setSelectedSeason(id)
    },
    [],
  )

  const onSeasonClick = React.useCallback(() => {
    setFocus('ArrowRight')
  }, [])

  const onEpisodeFocus = React.useCallback<FocusHandler>(({ y }) => {
    if (!scrollRef.current) return

    scrollRef.current.scrollTop = y
  }, [])

  React.useEffect(() => {
    if (!episodesBySeason) return

    focusSelf()
  }, [episodesBySeason, focusSelf])

  if (!selectedMedia) {
    return null
  }

  return (
    <div className="fixed w-screen h-screen bg-gray-950 bg-opacity-[1] z-20 flex justify-center">
      <div className="w-full rounded-lg overflow-hidden flex flex-col">
        <Preview className=" h-auto" backdrop />
        <div className="flex-1 mt-8 z-10 overflow-hidden">
          <FocusContext.Provider value={focusKey}>
            <div ref={ref} className="flex mx-8 h-full">
              <div className="flex flex-col justify-start space-y-5">
                {!selectedSeason && (
                  <Button
                    className="max-w-xs"
                    secondary
                    autoFocus
                    onClick={() => onPlay()}>
                    Play
                  </Button>
                )}
                {episodesBySeason && !selectedSeason && (
                  <Button onClick={onSeasonSelect('1')} secondary>
                    Seasons
                  </Button>
                )}
                {episodesBySeason &&
                  selectedSeason &&
                  Object.keys(episodesBySeason).map((key) => (
                    <Button
                      key={key}
                      onFocus={onSeasonSelect(key)}
                      onClick={onSeasonClick}
                      secondary>
                      Season {key} - {episodesBySeason[key].length} episodes
                    </Button>
                  ))}
              </div>
              <div
                ref={scrollRef}
                className="flex flex-col mx-10 space-y-5 overflow-scroll">
                {episodesBySeason &&
                  selectedSeason &&
                  episodesBySeason[selectedSeason].map((episode) => (
                    <Episode
                      key={episode.id}
                      episode={episode}
                      onFocus={onEpisodeFocus}
                      onClick={() => onPlay(episode.id)}
                    />
                  ))}
              </div>
            </div>
          </FocusContext.Provider>
        </div>
      </div>
    </div>
  )
}
