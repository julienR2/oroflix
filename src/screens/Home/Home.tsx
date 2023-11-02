import React from 'react'
import { ororoApi } from '../../libs/ororoApi'
import { NavigationProps } from '../../types/navigation'
import { MovieShort, ShowShort } from '../../types/ororo'
import { Preview } from '../../components/Preview'
import { Carousel } from '../../components/Carousel'

const Home = ({ navigate }: NavigationProps) => {
  const [loading, setLoading] = React.useState(true)
  const [movies, setMovies] = React.useState<MovieShort[]>([])
  const [shows, setShows] = React.useState<ShowShort[]>([])
  const [selected, setSelected] = React.useState<MovieShort | ShowShort>()

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
        setSelected(moviesData[0])
      } catch (error) {
        navigate('login')
      }
    }

    fetchData()
  }, [navigate])

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <Preview item={selected} />
      <Carousel items={movies.slice(0, 20)} />
    </div>
  )
}

export default Home
