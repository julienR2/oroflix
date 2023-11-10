import React from 'react'
import { MovieShort, ShowShort } from '../../types/ororo'
import classNames from 'classnames'
import { StoreContext } from '../../hooks/useStore'
import {
  FocusHandler,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'

type Props = {
  className?: string
  media: MovieShort | ShowShort
  autoFocus?: boolean
  onFocus: FocusHandler
}

export const CarouselItem = ({
  media,
  className,
  autoFocus,
  onFocus,
}: Props) => {
  const { setItem, focusedMedia } = React.useContext(StoreContext)

  const onSelect = React.useCallback(() => {
    setItem('selectedMedia', media)
  }, [setItem, media])

  const onItemFocus = React.useCallback<FocusHandler<object>>(
    (layout, props, details) => {
      setItem('focusedMedia', media)
      onFocus(layout, props, details)
    },
    [onFocus, media, setItem],
  )

  const { ref, focused, focusSelf } = useFocusable({
    focusKey: `${media.id}`,
    onFocus: onItemFocus,
    onEnterPress: onSelect,
  })

  const onClick = React.useCallback(() => {
    focusSelf()
    setItem('focusedMedia', media)
    setItem('selectedMedia', media)
  }, [focusSelf, setItem, media])

  React.useLayoutEffect(() => {
    if (focusedMedia?.id !== media.id) return

    focusSelf()
  }, [focusedMedia?.id, focusSelf, media.id])

  return (
    <li
      ref={ref}
      className={classNames(
        'flex-grow-0 flex-shrink-0 basis-auto mr-4 w-[12vw] rounded-md overflow-hidden transition-all snap-start',
        className,
        { 'ring-4 ring-inset ring-gray-300': focused },
      )}
      onClick={onClick}>
      <img
        src={media.poster_thumb}
        alt="thumbnail"
        className={classNames('w-full -z-10 relative')}
      />
    </li>
  )
}
