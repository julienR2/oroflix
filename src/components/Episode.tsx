import React from 'react'
import {
  FocusHandler,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import { EpisodeShort } from '../types/ororo'
import classNames from 'classnames'

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onFocus'
> & {
  episode: EpisodeShort
  onFocus?: FocusHandler
}

export const Episode = ({ episode, onFocus, ...props }: Props) => {
  const { ref, focused } = useFocusable({
    focusKey: `${episode.id}`,
    onEnterPress: () => {
      ref.current.click()
    },
    onFocus,
  })

  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'border border-gray-600 py-4 px-4 rounded-md',
        focused ? 'border-gray-400 bg-gray-900' : 'bg-gray-950',
      )}>
      <h2
        className={classNames(
          'font-bold text-2xl',
          focused ? 'text-gray-300' : 'text-gray-500',
        )}>
        {episode.name}
      </h2>
      <p
        className={classNames(
          'mt-2 text-xl',
          focused ? 'text-gray-400' : 'text-gray-600',
        )}>
        {episode.plot}
      </p>
    </div>
  )
}
