import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import classNames from 'classnames'
import { StoreContext, Store } from '../hooks/useStore'
import {
  FocusContext,
  FocusHandler,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'

type CarouselItemProps = {
  className?: string
  item: MovieShort | ShowShort
  autoFocus?: boolean
  onFocus: FocusHandler
}

const CarouselItem = ({
  item,
  className,
  autoFocus,
  onFocus,
}: CarouselItemProps) => {
  const { setItem } = React.useContext(StoreContext)

  const onSelect = React.useCallback(() => {
    setItem('focusedItem', item)
  }, [setItem, item])

  const { ref, focused, focusSelf } = useFocusable({
    onFocus: (layout, props: object, details) => {
      onSelect()
      onFocus(layout, props, details)
    },
    onEnterPress: () => {
      setItem('selectedItem', item)
    },
  })

  const onClick = React.useCallback(() => {
    focusSelf()
    setItem('focusedItem', item)
    setItem('selectedItem', item)
  }, [focusSelf, setItem, item])

  React.useEffect(() => {
    if (!autoFocus) return

    focusSelf()
    onSelect()
  }, [autoFocus, focusSelf, onSelect])

  return (
    <li
      ref={ref}
      className={classNames(
        'flex-grow-0 flex-shrink-0 basis-auto mr-4 snap-start w-[12vw] rounded-md overflow-hidden transition-all ',
        className,
        { 'ring-4 ring-inset ring-gray-300': focused },
      )}
      onClick={onClick}
    >
      <img
        src={item.poster_thumb}
        alt='thumbnail'
        className={classNames('w-full -z-10 relative')}
      />
    </li>
  )
}

type CarouselProps = {
  label: string
  items: Array<MovieShort | ShowShort>
  onFocus: FocusHandler
}

export const Carousel = ({ label, items, onFocus }: CarouselProps) => {
  const { ref, focusKey } = useFocusable({ onFocus })

  const scrollingRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (!scrollingRef.current) return

    scrollingRef.current.scrollTop = 0
  }, [])

  const onItemFocus = React.useCallback<FocusHandler>(({ x }) => {
    scrollingRef.current?.scrollTo({
      left: x,
      behavior: 'smooth',
    })
  }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      <div className='relative mb-6 z-10' ref={ref}>
        <p className='ml-8 text-gray-300 text-2xl font-semibold mb-2'>
          {label}
        </p>
        <ul
          ref={scrollingRef}
          className='flex w-full overflow-scroll snap-x scroll-smooth scroll-pl-8'
        >
          {items.map((movie, index) => (
            <CarouselItem
              key={movie.id}
              autoFocus={label.includes('Movies') && index === 0}
              className={classNames({ 'ml-8': index === 0 })}
              onFocus={onItemFocus}
              item={movie}
            />
          ))}
        </ul>
      </div>
    </FocusContext.Provider>
  )
}
