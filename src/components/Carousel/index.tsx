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
  label?: string
  media: Array<MovieShort | ShowShort>
  onFocus?: FocusHandler
  vertical?: boolean
}

export const Carousel = ({ label, media, onFocus, vertical }: Props) => {
  const { ref, focusKey } = useFocusable({
    onFocus,
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
  })

  const scrollingRef = React.useRef<HTMLDivElement>(null)

  const onMediaFocus = React.useCallback<FocusHandler>((...params) => {
    scrollingRef.current?.scrollTo({
      left: params[0].x,
      top: params[0].y,
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
        {label && (
          <p className="ml-8 text-gray-300 text-2xl font-semibold mb-2">
            {label}
          </p>
        )}
        <div
          ref={scrollingRef}
          className={classNames(
            'flex w-full overflow-scroll scroll-smooth scroll-pl-8',
            {
              'flex-wrap h-full': vertical,
            },
          )}>
          {media.map((media) => (
            <CarouselItem key={media.id} onFocus={onMediaFocus} media={media} />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  )
}
