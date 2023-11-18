import React from 'react'
import { Carousel } from '../components/Carousel'
import { useMedia } from '../hooks/useMedia'
import { NavigationProps } from '../types/navigation'
import { useMediaStore } from '../hooks/useMediaStore'

type Props = NavigationProps

const Search = ({ navigate, setLoading }: Props) => {
  const { setStoreItem } = useMediaStore()
  const { movies, isLoading, error } = useMedia()
  React.useEffect(() => {
    console.log('movies', movies)
    if (!isLoading && !error) {
      console.log('selected Mediua !', movies[0])
      setStoreItem('focusedMedia', movies[0])
      return setLoading(false)
    }

    if (error) {
      return navigate('Login')
    }
  }, [isLoading, error, navigate, setLoading, setStoreItem, movies])

  return (
    <div className="flex h-full">
      <div className="flex flex-col">
        <h1>keyboard</h1>
      </div>
      <div className="flex flex-col">
        <h1>Search</h1>
        <Carousel
          label="Popular Movies"
          medium={movies.slice(0, 20)}
          onFocus={() => {}}
          vertical
        />
      </div>
    </div>
  )
}

export default Search
