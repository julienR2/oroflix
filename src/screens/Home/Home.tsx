import React from 'react'
import { ororoApi } from '../../libs/ororoApi'
import { NavigationProps } from '../../types/navigation'
import { MovieShort, ShowShort } from '../../types/ororo'

const Home = ({ navigate }: NavigationProps) => {
  const [loading, setLoading] = React.useState(true)
  const [movies, setMovies] = React.useState<MovieShort[]>([])
  const [shows, setShows] = React.useState<ShowShort[]>([])

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
      <h1>Home</h1>
      <p>
        movies:{' '}
        {movies.slice(0, 10).map((movie) => (
          <img key={movie.id} src={movie.poster_thumb} alt='thumbnail' />
        ))}
      </p>
      <p>shows: {JSON.stringify(shows.slice(0, 10))}</p>
    </div>
  )
}

export default Home
