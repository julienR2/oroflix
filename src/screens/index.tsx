import React from 'react'

import Login from './Login'
import './index.css'
import Home from './Home'
import { Screens } from '../types/navigation'
import Search from './Search'

const Routes = {
  login: Login,
  home: Home,
  search: Search,
}

const Index = () => {
  const [currentRoute, setCurrentRoute] = React.useState<Screens>('home')

  const Route = Routes[currentRoute]

  return (
    <div className='text-white font-sans'>
      <Route navigate={setCurrentRoute} />
    </div>
  )
}

export default Index
