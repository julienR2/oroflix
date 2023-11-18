import React from 'react'
import { NavigationProps } from '../types/navigation'
import { Preview } from '../components/Preview'
import { Carousel } from '../components/Carousel'
import { orderBy } from 'lodash'
import { FocusHandler } from '@noriginmedia/norigin-spatial-navigation'
import { MediaDetail } from '../components/MediaDetail'
import { MediaVideo } from '../components/MediaVideo'
import { useMedia } from '../hooks/useMedia'
import { MediaStoreProvider, useMediaStore } from '../hooks/useMediaStore'

type Props = NavigationProps

const Home = ({ navigate, loading, setLoading }: Props) => {
  const scrollingRef = React.useRef<HTMLDivElement>(null)
  const { setStoreItem } = useMediaStore()
  const {
    movies,
    shows,
    isLoading: isMediaLoading,
    error: mediaError,
  } = useMedia()

  const popularMovies = React.useMemo(
    () => orderBy(movies, 'user_popularity', 'desc'),
    [movies],
  )

  const popularShows = React.useMemo(
    () => orderBy(shows, 'user_popularity', 'desc'),
    [shows],
  )

  React.useEffect(() => {
    if (!popularMovies || !popularMovies[0]) return

    setStoreItem('focusedMedia', popularMovies[0])
  }, [setStoreItem, popularMovies])

  React.useEffect(() => {
    if (!isMediaLoading && !mediaError) {
      return setLoading(false)
    }

    if (mediaError) {
      return navigate('Login')
    }
  }, [isMediaLoading, mediaError, navigate, setLoading])

  const onCarouselFocus = React.useCallback<FocusHandler>(({ y }) => {
    scrollingRef.current?.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }, [])

  if (loading) {
    return null
  }

  return (
    <div className="h-screen flex flex-col pl-4">
      <Preview />
      <div ref={scrollingRef} className="overflow-scroll">
        <Carousel
          label="Popular Movies"
          media={popularMovies.slice(0, 20)}
          onFocus={onCarouselFocus}
        />
        <Carousel
          label="Popular Shows"
          media={popularShows.slice(0, 20)}
          onFocus={onCarouselFocus}
        />
      </div>
    </div>
  )
}

const Providers = (props: Props) => (
  <MediaStoreProvider>
    <MediaVideo />
    <MediaDetail />
    <Home {...props} />
  </MediaStoreProvider>
)

export default Providers
