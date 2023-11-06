import React from 'react'
import { ororoApi } from '../libs/ororoApi'
import { NavigationProps } from '../types/navigation'
import { MovieShort, ShowShort } from '../types/ororo'
import { Preview } from '../components/Preview'
import { Carousel } from '../components/Carousel'
import { orderBy } from 'lodash'
import { StoreContext, StoreProvider } from '../hooks/useStore'
import { FocusHandler } from '@noriginmedia/norigin-spatial-navigation'
import { MovieModal } from '../components/MovieModal'

type Props = NavigationProps

const Home = ({ navigate, loading, setLoading }: Props) => {
  const scrollingRef = React.useRef<HTMLDivElement>(null)
  const { setItem } = React.useContext(StoreContext)
  const [movies, setMovies] = React.useState<MovieShort[]>([])
  const [shows, setShows] = React.useState<ShowShort[]>([])

  const popularMovies = React.useMemo(
    () => orderBy(movies, 'user_popularity', 'desc'),
    [movies],
  )

  const popularShows = React.useMemo(
    () => orderBy(shows, 'user_popularity', 'desc'),
    [shows],
  )

  React.useEffect(() => {
    setItem('focusedItem', popularMovies[0])
  }, [setItem, popularMovies])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [moviesData, showsData] = await Promise.all([
          ororoApi.movies(),
          ororoApi.shows(),
        ])

        if (!moviesData.length) {
          throw Error()
        }

        setMovies(moviesData)
        setShows(showsData)
        setLoading(false)
        setItem('focusedItem', moviesData[0])
      } catch (error) {
        navigate('Login')
      }
    }

    fetchData()
  }, [navigate, setItem, setLoading])

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
    <div className='h-screen flex flex-col'>
      <Preview />

      <div ref={scrollingRef} className='overflow-scroll'>
        <Carousel
          label='Popular Movies'
          items={popularMovies.slice(0, 20)}
          onFocus={onCarouselFocus}
        />
        <Carousel
          label='Popular Shows'
          items={popularShows.slice(0, 20)}
          onFocus={onCarouselFocus}
        />
      </div>
    </div>
  )
}

const Providers = (props: Props) => (
  <StoreProvider>
    <MovieModal />
    <Home {...props} />
  </StoreProvider>
)

export default Providers
