import React from 'react'
import { MovieShort, ShowShort } from '../../types/ororo'
import classNames from 'classnames'
import {
  FocusContext,
  FocusHandler,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import { CarouselItem } from './CarouselItem'

type Props = {
  label: string
  medium: Array<MovieShort | ShowShort>
  onFocus: FocusHandler
}

export const Carousel = ({ label, medium, onFocus }: Props) => {
  const { ref, focusKey } = useFocusable({ onFocus })

  const scrollingRef = React.useRef<HTMLUListElement>(null)

  const onMediaFocus = React.useCallback<FocusHandler>(({ x }) => {
    scrollingRef.current?.scrollTo({
      left: x - 32,
      behavior: 'smooth',
    })
  }, [])

  React.useEffect(() => {
    if (!scrollingRef.current) return

    scrollingRef.current.scrollLeft = 0
  }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="relative mb-6 z-10" ref={ref}>
        <p className="ml-8 text-gray-300 text-2xl font-semibold mb-2">
          {label}
        </p>
        <ul
          ref={scrollingRef}
          className="flex w-full overflow-scroll scroll-smooth scroll-pl-8">
          {medium.map((media, index) => (
            <CarouselItem
              key={media.id}
              className={classNames({ 'ml-8': index === 0 })}
              onFocus={onMediaFocus}
              media={media}
            />
          ))}
        </ul>
      </div>
    </FocusContext.Provider>
  )
}
