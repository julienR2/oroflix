import React from 'react'
import { init } from '@noriginmedia/norigin-spatial-navigation';

import Login from './Login'
import './index.css'
import Home from './Home'
import { Screens } from '../types/navigation'
import Search from './Search'

init()

const Routes = {
  Login,
  Home,
  Search,
}

const Index = () => {
  const [currentRoute, setCurrentRoute] = React.useState<Screens>('Home')

  const Route = Routes[currentRoute]

  return (
    <Route navigate={setCurrentRoute} />
  )
}

export default Index
