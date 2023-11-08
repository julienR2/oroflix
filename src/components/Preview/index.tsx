import React from 'react'
import { ShowShort } from '../../types/ororo'
import imdbLogo from '../../assets/imdb.svg'
import { StoreContext } from '../../hooks/useStore'
import classNames from 'classnames'

import classes from './styles.module.css'

export const Preview = () => {
  const { focusedMedia } = React.useContext(StoreContext)

  if (!focusedMedia) return null

  return (
    <div className="p-8 relative h-[40vh]">
      <div className="font-medium text-lg max-w-[50%] z-10 relative">
        <h1 className="text-7xl font-bold line-clamp-2 mb-4 max-w-[80%]">
          {focusedMedia.name}
        </h1>
        <div className="text-gray-400 flex mb-6 text-xl items-center justify-start">
          {focusedMedia.year}
          {' · '}
          <img src={imdbLogo} alt="imdb" className="h-5 mx-2" />
          {focusedMedia.imdb_rating}/10
          {(focusedMedia as ShowShort).myshows_id ? <>{' · '}Serie</> : ''}
        </div>
        <p className="text-gray-400 text-2xl mb-5 line-clamp-3">
          {focusedMedia.desc}
        </p>
        <p className="text-gray-500 text-lg">
          {focusedMedia.array_genres.map((genre, index) => (
            <span key={genre}>
              {index ? ' · ' : ''}
              {genre}
            </span>
          ))}
        </p>
      </div>
      <div
        className={classNames(
          classes.backdropWrapper,
          'absolute top-0 left-0 right-0 flex justify-end bottom-[-8vh]',
        )}>
        <img
          src={focusedMedia.backdrop_url}
          alt="backdrop"
          className="-z-10 object-cover w-[60vw]"
        />
      </div>
    </div>
  )
}
