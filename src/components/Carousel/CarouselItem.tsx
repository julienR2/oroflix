import React from 'react'
import { MovieShort, ShowShort } from '../../types/ororo'
import classNames from 'classnames'
import {
  FocusHandler,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import { useMediaStore } from '../../hooks/useMediaStore'

type Props = {
  className?: string
  media: MovieShort | ShowShort
  onFocus: FocusHandler
}

export const CarouselItem = ({ media, className, onFocus }: Props) => {
  const { setStoreItem, focusedMedia } = useMediaStore()

  const onSelect = React.useCallback(() => {
    setStoreItem('selectedMedia', media)
  }, [setStoreItem, media])

  const onItemFocus = React.useCallback<FocusHandler<object>>(
    (layout, props, details) => {
      setStoreItem('focusedMedia', media)
      onFocus(layout, props, details)
    },
    [onFocus, media, setStoreItem],
  )

  const { ref, focused, focusSelf } = useFocusable({
    focusKey: `${media.id}`,
    onFocus: onItemFocus,
    onEnterPress: onSelect,
  })

  const onClick = React.useCallback(() => {
    focusSelf()
    setStoreItem('focusedMedia', media)
    setStoreItem('selectedMedia', media)
  }, [focusSelf, setStoreItem, media])

  React.useLayoutEffect(() => {
    console.log('focusedMedia?.id', focusedMedia?.id)
    if (focusedMedia?.id !== media.id) return
    console.log('focussing', media.id)
    focusSelf()
  }, [focusedMedia?.id, focusSelf, media.id])

  return (
    <div
      ref={ref}
      className={classNames(
        'flex-grow-0 flex-shrink-0 basis-auto mr-4 mb-4 w-[12vw] rounded-md overflow-hidden transition-all snap-start',
        className,
        { 'ring-4 ring-inset ring-gray-300': focused },
      )}
      onClick={onClick}>
      <img
        src={media.poster_thumb}
        alt="thumbnail"
        className={classNames('w-full -z-10 relative')}
      />
    </div>
  )
}
