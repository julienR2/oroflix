import React from 'react'
import { useAsyncCallback } from './useAsyncCallback'
import { ororoApi } from '../libs/ororoApi'

export const useMedia = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  const { data, error } = useAsyncCallback(async () => {
    setIsLoading(true)

    const [movies, shows] = await Promise.all([
      ororoApi.movies(),
      ororoApi.shows(),
    ])

    if (!movies.length) {
      throw Error()
    }

    setIsLoading(false)

    return { movies, shows }
  }, [])

  const movies = React.useMemo(() => data?.movies || [], [data?.movies])

  const shows = React.useMemo(() => data?.shows || [], [data?.shows])

  return { movies, shows, isLoading, error }
}
