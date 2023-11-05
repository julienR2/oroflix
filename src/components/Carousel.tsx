import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import classNames from 'classnames'
import { StoreContext, Store } from '../hooks/useStore'
import { FocusContext, FocusHandler, useFocusable } from '@noriginmedia/norigin-spatial-navigation'

type CarouselItemProps = {
  className?: string
  onClick?: () => void
  poster: string
  autoFocus?: boolean
  onFocus: FocusHandler
}


const CarouselItem = ({ poster, onClick, className, autoFocus, onFocus }: CarouselItemProps) => {
  const { ref, focused, focusSelf } = useFocusable({
    onFocus,
    onEnterPress: () => {

    }
  });

  React.useEffect(() => {
    if (!autoFocus) return

    focusSelf();
  }, [autoFocus, focusSelf])

  return <li
    ref={ref}
    className={classNames(
      'flex-grow-0 flex-shrink-0 basis-auto mr-4 snap-start w-[12vw] rounded-sm overflow-hidden',
      className,
      { 'border-2 border-gray-400': focused }
    )}
    onClick={onClick}
  >
    <img src={poster} alt='thumbnail' />
  </li>
}

type CarouselProps = {
  label: string
  items: Array<MovieShort | ShowShort>
  onFocus: FocusHandler
}

export const Carousel = ({ label, items, onFocus }: CarouselProps) => {
  const { setItem } = React.useContext(StoreContext)
  const { ref, focusKey } = useFocusable({ onFocus });

  const scrollingRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (!scrollingRef.current) return

    scrollingRef.current.scrollTop = 0
  }, [])

  const onItemFocus = React.useCallback<FocusHandler>(
    ({ x }) => {
      scrollingRef.current?.scrollTo({
        left: x, behavior: 'smooth'
      });
    },
    [],
  )

  const onClick = React.useCallback(
    (item: Store['selectedItem']) => () => {
      setItem('selectedItem', item)
    },
    [setItem],
  )

  return (
    <FocusContext.Provider value={focusKey}>
      <div className='relative mb-6' ref={ref}>
        <p className='ml-8 text-gray-300 text-2xl font-semibold mb-2'>{label}</p>
        <ul
          ref={scrollingRef}
          className='flex w-full overflow-scroll snap-x scroll-smooth scroll-pl-8'
        >
          {items.map((movie, index) => (
            <CarouselItem key={movie.id}
              autoFocus={label.includes('Movies') && index === 0}
              className={classNames({ 'ml-8': index === 0 })}
              onClick={onClick(movie)}
              onFocus={onItemFocus}
              poster={movie.poster_thumb} />
          ))}
        </ul>
      </div>
    </FocusContext.Provider>
  )
}

