import React from 'react'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import classNames from 'classnames'
import { NavigationProps, Screens } from '../../types/navigation'

type Props = {
  name: Screens
  onRoutePress?: (route: Screens) => void
  currentRoute?: boolean
  icon: typeof HomeIcon
}

const Route = ({ name, onRoutePress, currentRoute, icon: Icon }: Props) => {
  const { ref, focused } = useFocusable({
    focusKey: name,
    onEnterPress: () => {
      onRoutePress?.(name)
    },
  })

  return (
    <div
      ref={ref}
      className={classNames('p-2 mb-10', {
        'ring-2 ring-inset ring-gray-300 rounded-md': focused,
      })}>
      <Icon
        width={24}
        className={classNames(
          'stroke-2 ',
          currentRoute
            ? 'stroke-gray-200 fill-gray-200'
            : 'stroke-gray-600 fill-gray-600',
        )}
      />
    </div>
  )
}

type SidebarProps = Pick<NavigationProps, 'navigate'> & {
  currentRoute: string
}

export const Sidebar = ({ currentRoute, navigate }: SidebarProps) => {
  const { ref, focusKey } = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['left', 'up', 'down'],
  })

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="flex flex-col p-4 justify-center items-center ml-4">
        <Route
          name="Search"
          icon={SearchIcon}
          currentRoute={currentRoute === 'Search'}
          onRoutePress={navigate}
        />
        <Route
          name="Home"
          icon={HomeIcon}
          currentRoute={currentRoute === 'Home'}
          onRoutePress={navigate}
        />
      </div>
    </FocusContext.Provider>
  )
}
