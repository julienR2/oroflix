export type Screens = 'Login' | 'Search' | 'Home'

export type NavigationProps = {
  navigate: (key: Screens) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}
