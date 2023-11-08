export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Biography'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'Film-Noir'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'News'
  | 'Romance'
  | 'Sci-Fi'
  | 'Short'
  | 'Sport'
  | 'TV Movie'
  | 'TV Special'
  | 'Thriller'
  | 'War'
  | 'Western'

export type MovieShort = {
  id: number
  name: string
  poster: string
  imdb_rating: number
  year: string
  desc: string
  imdb_id: string
  slug: string
  user_popularity: number
  trailer: string
  array_genres: Genre[]
  array_countries: string[]
  backdrop_url: string
  resolution: string
  watched_media_count: number
  info: { smil: string; thumbs: number; original: string }
  versions: Record<'240p' | '360p' | '480p' | '1080p', string>
  length: number
  updated_at: number
  poster_thumb: string
}

export type Movie = MovieShort & {
  type: 'movie'
  subtitles: { lang: string; url: string }[]
  url: string
  download_url: string
}

export type EpisodeShort = {
  id: number
  name: string
  plot: string
  season: number
  number: string
  resolution: string
  watched_media_count: number
  myshows_id: number
  info: { smil: string; thumbs: number; original: string }
  versions: Record<'240p' | '360p' | '480p' | '720p' | '1080p', string>
  airdate: string
  updated_at: number
}

export type Episode = EpisodeShort & {
  subtitles: { lang: string; url: string }[]
  show_name: string
  url: string
  download_url: string
}

export type ShowShort = {
  id: number
  name: string
  imdb_rating: number
  year: string
  desc: string
  slug: string
  ended: true
  length: number
  user_popularity: number
  array_genres: Genre[]
  array_countries: string[]
  backdrop_url: string
  imdb_id: string
  kinopoisk_id: string
  tmdb_id: string
  myshows_id: number
  poster: string
  poster_thumb: string
  newest_video: number
  updated_at: number
}

export type Show = ShowShort & {
  type: 'show'
  episodes: EpisodeShort[]
  seasons: number
}
