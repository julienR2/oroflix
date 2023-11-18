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
  vertical?: boolean
}

export const Carousel = ({ label, medium, onFocus, vertical }: Props) => {
  const { ref, focusKey } = useFocusable({ onFocus })

  const scrollingRef = React.useRef<HTMLDivElement>(null)

  const onMediaFocus = React.useCallback<FocusHandler>(({ x }) => {
    scrollingRef.current?.scrollTo({
      left: x,
      behavior: 'smooth',
    })
  }, [])

  React.useEffect(() => {
    if (!scrollingRef.current) return

    scrollingRef.current.scrollLeft = 0
  }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        className={classNames(
          'relative z-10 overflow-hidden',
          vertical ? 'mb-0' : 'mb-6',
        )}
        ref={ref}>
        <p className="ml-8 text-gray-300 text-2xl font-semibold mb-2">
          {label}
        </p>
        <div
          ref={scrollingRef}
          className={classNames(
            'flex w-full overflow-scroll scroll-smooth scroll-pl-8',
            {
              'flex-wrap h-full': vertical,
            },
          )}>
          {medium.map((media, index) => (
            <CarouselItem key={media.id} onFocus={onMediaFocus} media={media} />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  )
}
