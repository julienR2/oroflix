import React from 'react'

type AsyncState<T, R> = {
  data: T | null
  error: any
  loading: boolean
  refetch: (params?: R) => Promise<void>
}

type Options<R> = {
  variables?: R
}

export const useAsyncCallback = <T, R extends { [key: string]: any }>(
  asyncCallback: (params: R) => Promise<T>,
  dependencies: any[] = [],
  options?: Options<R>,
): AsyncState<T, R> => {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizeAsyncCallback = React.useCallback(asyncCallback, dependencies)

  const refetch = React.useCallback(
    async (params?: R) => {
      try {
        setLoading(true)
        const result = await memoizeAsyncCallback(
          params || options?.variables || ({} as R),
        )
        setData(result)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [memoizeAsyncCallback, ...Object.values(options?.variables || {})],
  )

  React.useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
