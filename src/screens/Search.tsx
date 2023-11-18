import React from 'react'
import { Carousel } from '../components/Carousel'
import { useMedia } from '../hooks/useMedia'
import { NavigationProps } from '../types/navigation'
import { useMediaStore } from '../hooks/useMediaStore'
import { Keyboard } from '../components/Keyboard'
import { ReactComponent as SearchIcon } from '../assets/search.svg'
import classNames from 'classnames'
import { orderBy } from 'lodash'
import Fuse from 'fuse.js'

type Props = NavigationProps

const Search = ({ navigate, setLoading }: Props) => {
  const { setStoreItem } = useMediaStore()
  const { movies, shows, isLoading, error } = useMedia()
  const [query, setQuery] = React.useState('')

  const popularMovies = React.useMemo(
    () => orderBy(movies, 'user_popularity', 'desc'),
    [movies],
  )

  const fuse = React.useMemo(
    () =>
      new Fuse([...movies, ...shows], {
        keys: ['name', 'desc', 'array_genres'],
      }),
    [movies, shows],
  )

  const media = React.useMemo(() => {
    if (!query) return null

    return fuse.search(query).map(({ item }) => item)
  }, [fuse, query])

  React.useEffect(() => {
    if (!isLoading && !error) {
      return setLoading(false)
    }

    if (error) {
      return navigate('Login')
    }
  }, [isLoading, error, navigate, setLoading, setStoreItem])

  const onKeyPress = React.useCallback((key: string) => {
    setQuery((query) => query + key)
  }, [])

  const onBackSpace = React.useCallback(() => {
    setQuery((query) => query.slice(0, -1))
  }, [])

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-[30%] p-7">
        <Keyboard onKeyPress={onKeyPress} onBackSpace={onBackSpace} />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="relative mb-6">
          <h1
            className={classNames(
              'font-semibold text-3xl text-gray-300',
              query ? 'invisible' : undefined,
            )}>
            Popular Movies
          </h1>
          {query && (
            <div className="flex absolute top-0 left-0 right-0 bottom-0 items-center">
              <SearchIcon
                width={24}
                className="stroke-2 stroke-gray-300 mr-4"
              />
              <p className="text-4xl font-medium text-gray-300 mb-1">{query}</p>
            </div>
          )}
        </div>
        <Carousel media={(media || popularMovies).slice(0, 20)} vertical />
      </div>
    </div>
  )
}

export default Search
