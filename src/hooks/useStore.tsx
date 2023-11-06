import React from 'react'
import { MovieShort, ShowShort } from '../types/ororo'
import { ObjectToMap } from '../types/utils'

export type Store = {
  focusedItem?: MovieShort | ShowShort
  selectedItem?: MovieShort | ShowShort
}

type Context = Store & {
  setItem: (...params: ObjectToMap<Store>) => void
}

export const StoreContext = React.createContext<Context>({ setItem: () => {} })

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = React.useState({})

  const setItem = React.useCallback<Context['setItem']>((item, value) => {
    setStore((prevStore) => ({
      ...prevStore,
      [item]: value,
    }))
  }, [])

  const value = React.useMemo(
    () => ({
      ...store,
      setItem,
    }),
    [store, setItem],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
