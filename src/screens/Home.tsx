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

  const popular = React.useMemo(
    () => orderBy([...movies, ...shows], 'user_popularity', 'desc'),
    [movies, shows],
  )

  React.useEffect(() => {
    setItem('selectedItem', popular[0])
  }, [setItem, popular])

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
        navigate('login')
      }
    }

    fetchData()
  }, [navigate, setItem])

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Preview />
      <Carousel label='Popular' items={popular.slice(0, 20)} />
    </>
  )
}

const Providers = (props: Props) => (
  <StoreProvider>
    <Home {...props} />
  </StoreProvider>
)

export default Providers
