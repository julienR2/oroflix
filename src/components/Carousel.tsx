import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import classNames from 'classnames'

type Props = {
  items: Array<MovieShort | ShowShort>
}

export const Carousel = ({ items }: Props) => {
  return (
    <ul className='flex w-full overflow-scroll snap-x scroll-smooth scroll-pl-8'>
      {items.map((movie, index) => (
        <li
          key={movie.id}
          className={classNames(
            'flex-grow-0 flex-shrink-0 basis-auto mr-4 snap-start w-[12vw]',
            { 'ml-8': index === 0 },
          )}
        >
          <img src={movie.poster_thumb} alt='thumbnail' />
        </li>
      ))}
    </ul>
  )
}
