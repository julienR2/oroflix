import React from 'react'

type CallbackTypes<T extends object> = {
  [K in keyof T]: T[K] | ((value: T[K]) => T[K])
}

type Context<T extends object> = T & {
  setStoreItem: <K extends keyof T>(
    item: K,
    callback: CallbackTypes<T>[K],
  ) => void
}

type Provider<T extends object> = (params: {
  children: React.ReactNode
  initialStore?: Partial<T>
}) => React.ReactElement

export const createStore = <T extends object>(
  defaultStore: T,
): {
  StoreContext: React.Context<Context<T>>
  StoreProvider: Provider<T>
  useStore: () => Context<T>
} => {
  const StoreContext = React.createContext<Context<T>>({
    ...defaultStore,
    setStoreItem: () => {},
  })

  const StoreProvider = ({
    children,
    initialStore,
  }: React.ComponentProps<Provider<T>>): React.ReactElement => {
    const [store, setStore] = React.useState<T>({
      ...defaultStore,
      ...initialStore,
    })

    const setStoreItem = React.useCallback(
      <K extends keyof T>(item: K, value: CallbackTypes<T>[K]) => {
        setStore((prevStore) => ({
          ...prevStore,
          [item]: typeof value === 'function' ? value(prevStore[item]) : value,
        }))
      },
      [],
    )

    const value = React.useMemo(
      () => ({
        ...store,
        setStoreItem,
      }),
      [store, setStoreItem],
    )

    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
  }

  const useStore = () => React.useContext(StoreContext)

  return { StoreContext, StoreProvider, useStore }
}
