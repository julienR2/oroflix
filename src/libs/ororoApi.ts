import { orderBy } from 'lodash'
import { Episode, Movie, MovieShort, Show, ShowShort } from '../types/ororo'
import localforage from 'localforage'

const getHeaders = () => {
  const token = localStorage.getItem('token')

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  }
}

const movies = async (): Promise<MovieShort[]> => {
  const cachedMovies = await localforage.getItem<MovieShort[] | null>('movies')

  if (cachedMovies?.length) {
    return cachedMovies
  }

  const response = await fetch('https://front.ororo-mirror.tv/api/v2/movies', {
    headers: getHeaders(),
  })

  const { movies: data } = await response.json()

  const moviesToChache = orderBy(data, 'updated_at', 'desc')
  localforage.setItem('movies', moviesToChache)

  return moviesToChache
}

const movie = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/movies/${id}`,
    { headers: getHeaders() },
  )
  const data = await response.json()

  return data
}

const shows = async (): Promise<ShowShort[]> => {
  const cachedShows = await localforage.getItem<ShowShort[] | null>('shows')

  if (cachedShows?.length) {
    return cachedShows
  }

  const response = await fetch('https://front.ororo-mirror.tv/api/v2/shows', {
    headers: getHeaders(),
  })

  const { shows: data } = await response.json()

  const showsToChache = orderBy(data, 'updated_at', 'desc')
  localforage.setItem('shows', showsToChache)

  return showsToChache
}

const show = async (id: number): Promise<Show> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/shows/${id}`,
    { headers: getHeaders() },
  )
  const data = await response.json()

  return data
}

const episode = async (id: number): Promise<Episode> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/episodes/${id}`,
    { headers: getHeaders() },
  )
  const data = await response.json()

  return data
}

const isAuthenticated = async () => {
  try {
    // check if access to a movie
    const data = await movie(5253)

    if (!data) {
      throw Error()
    }

    return true
  } catch (error) {
    return false
  }
}

const login = async (email: string, password: string) => {
  localStorage.setItem('token', btoa(`${email}:${password}`))

  const authenticated = await isAuthenticated()

  if (!authenticated) {
    localStorage.removeItem('token')
    throw Error()
  }

  return true
}

export const ororoApi = {
  movies,
  movie,
  shows,
  show,
  episode,
  login,
  isAuthenticated,
}
