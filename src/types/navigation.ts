export type Screens = 'login' | 'search' | 'home'

export type NavigationProps = {
  navigate: (key: Screens) => void
}
