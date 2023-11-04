import React from 'react'
import { ororoApi } from '../libs/ororoApi'
import { NavigationProps } from '../types/navigation'
import { MovieShort, ShowShort } from '../types/ororo'
import { Preview } from '../components/Preview'
import { Carousel } from '../components/Carousel'
import { orderBy } from 'lodash'
import { StoreContext, StoreProvider } from '../hooks/useStore'

type Props = NavigationProps

const Home = ({ navigate }: Props) => {
  const { setItem } = React.useContext(StoreContext)
  const [loading, setLoading] = React.useState(true)
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
    setItem('selectedItem', popularMovies[0])
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
        setItem('selectedItem', moviesData[0])
      } catch (error) {
        navigate('Login')
      }
    }

    fetchData()
  }, [navigate, setItem])

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div className='h-screen flex flex-col'>
      <Preview />
      <div className='overflow-scroll'>

        <Carousel label='Popular Movies' items={popularMovies.slice(0, 20)} />
        <Carousel label='Popular Shows' items={popularShows.slice(0, 20)} />
      </div>
    </div>
  )
}

const Providers = (props: Props) => (
  <StoreProvider>
    <Home {...props} />
  </StoreProvider>
)

export default Providers
