import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import classNames from 'classnames'
import { StoreContext, Store } from '../hooks/useStore'

type Props = {
  label: string
  items: Array<MovieShort | ShowShort>
}

export const Carousel = ({ label, items }: Props) => {
  const { setItem } = React.useContext(StoreContext)

  const ulRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (!ulRef.current) return

    ulRef.current.scrollTop = 0
  }, [])

  const onClick = React.useCallback(
    (item: Store['selectedItem']) => () => {
      setItem('selectedItem', item)
    },
    [setItem],
  )

  return (
    <div>
      <p className='ml-8 text-gray-300 text-2xl font-semibold mb-2'>{label}</p>
      <ul
        ref={ulRef}
        className='flex w-full overflow-scroll snap-x scroll-smooth scroll-pl-8'
      >
        {items.map((movie, index) => (
          <li
            key={movie.id}
            className={classNames(
              'flex-grow-0 flex-shrink-0 basis-auto mr-4 snap-start w-[12vw]',
              { 'ml-8': index === 0 },
            )}
            onClick={onClick(movie)}
          >
            <img src={movie.poster_thumb} alt='thumbnail' />
          </li>
        ))}
      </ul>
    </div>
  )
}
