import React from 'react'

import Login from './Login/Login'
import './index.css'
import Home from './Home/Home'
import { Screens } from '../types/navigation'
import Search from './Search/Search'

const Routes = {
  login: Login,
  home: Home,
  search: Search,
}

const Index = () => {
  const [currentRoute, setCurrentRoute] = React.useState<Screens>('home')
  console.log('currentRoute', currentRoute)
  const Route = Routes[currentRoute]

  return (
    <div className='text-white font-sans'>
      <Route navigate={setCurrentRoute} />
    </div>
  )
}

export default Index
