import { orderBy } from 'lodash'
import { Episode, Movie, MovieShort, Short, ShowShort } from '../types/ororo'

const cache: { movies: MovieShort[]; shows: ShowShort[] } = {
  movies: [],
  shows: [],
}

const getHeaders = () => {
  const token = localStorage.getItem('token')

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  }
}

const movies = async (): Promise<MovieShort[]> => {
  if (cache.movies.length) {
    return cache.movies
  }

  const response = await fetch('https://front.ororo-mirror.tv/api/v2/movies', {
    headers: getHeaders(),
  })

  const { movies: data } = await response.json()

  cache.movies = orderBy(data, '')
  return data
}

const movie = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/movies/${id}`,
    { headers: getHeaders() },
  )
  const data = response.json()

  return data
}

const shows = async (): Promise<ShowShort[]> => {
  if (cache.shows.length) {
    return cache.shows
  }

  const response = await fetch('https://front.ororo-mirror.tv/api/v2/shows', {
    headers: getHeaders(),
  })
  const { shows: data } = await response.json()

  cache.shows = data
  return data
}

const show = async (id: number): Promise<Short[]> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/shows/${id}`,
    { headers: getHeaders() },
  )
  const data = response.json()

  return data
}

const episode = async (id: number): Promise<Episode[]> => {
  const response = await fetch(
    `https://front.ororo-mirror.tv/api/v2/episodes/${id}`,
    { headers: getHeaders() },
  )
  const data = response.json()

  return data
}

const login = async (email: string, password: string) => {
  localStorage.setItem('token', btoa(`${email}:${password}`))

  try {
    // check if access to a movie
    const data = await movie(5253)

    if (!data) {
      throw Error()
    }

    return true
  } catch (error) {
    localStorage.removeItem('token')
    throw error
  }
}

export const ororoApi = {
  movies,
  movie,
  shows,
  show,
  episode,
  login,
}
