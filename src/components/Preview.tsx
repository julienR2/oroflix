import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import imdbLogo from '../assets/imdb.svg'

type Props = {
  item?: MovieShort | ShowShort
}

export const Preview = ({ item }: Props) => {
  if (!item) return null

  return (
    <div className='p-8 relative h-[45vh] -z-10'>
      <div className='font-medium text-lg max-w-[50%] z-10 relative'>
        <h1 className='text-7xl mb-3 font-bold'>{item.name}</h1>
        <div className='text-gray-400 flex items-center mb-6 text-xl'>
          {item.year}
          {' · '}
          <img src={imdbLogo} alt='imdb' className='h-5 mx-2' />
          {item.imdb_rating}/10
          {(item as ShowShort).myshows_id ? <>{' · '}Serie</> : ''}
        </div>
        <p className='text-gray-400 text-2xl mb-5'>{item.desc}</p>
        <p className='text-gray-500 text-lg'>
          {item.array_genres.map((genre, index) => (
            <span key={genre}>
              {index ? ' · ' : ''}
              {genre}
            </span>
          ))}
        </p>
      </div>
      <div
        className=' absolute top-0 left-0 right-0 flex justify-end bottom-[-8vh]'
        style={{
          background:
            'linear-gradient(to right, black 35vw, transparent 53vw), linear-gradient(to top, black 4vh, transparent 20vh)',
        }}
      >
        <img
          src={item.backdrop_url}
          alt='backdrop'
          className='-z-10 object-cover w-[65vw]'
        />
      </div>
    </div>
  )
}
