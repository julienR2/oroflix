import React from 'react'
import { ShowShort } from '../types/ororo'
import imdbLogo from '../assets/imdb.svg'
import { StoreContext } from '../hooks/useStore'

export const Preview = () => {
  const { selectedItem } = React.useContext(StoreContext)

  if (!selectedItem) return null

  return (
    <div className='p-8 relative h-[40vh] -z-10'>
      <div className='font-medium text-lg max-w-[50%] z-10 relative'>
        <h1 className='text-7xl mb-3 font-bold'>{selectedItem.name}</h1>
        <div className='text-gray-400 flex selectedItems-center mb-6 text-xl items-center'>
          {selectedItem.year}
          {' · '}
          <img src={imdbLogo} alt='imdb' className='h-5 mx-2' />
          {selectedItem.imdb_rating}/10
          {(selectedItem as ShowShort).myshows_id ? <>{' · '}Serie</> : ''}
        </div>
        <p className='text-gray-400 text-2xl mb-5 line-clamp-3'>
          {selectedItem.desc}
        </p>
        <p className='text-gray-500 text-lg'>
          {selectedItem.array_genres.map((genre, index) => (
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
            'linear-gradient(to right, black 40vw, transparent 80vw), linear-gradient(to top, black 4vh, transparent 20vh)',
        }}
      >
        <img
          src={selectedItem.backdrop_url}
          alt='backdrop'
          className='-z-10 object-cover w-[60vw]'
        />
      </div>
    </div>
  )
}
