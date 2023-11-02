// Convert { key1: value1, key2: undefined } into [key1, value1] | [key2]
export type ObjectToMap<
  O extends { [key: string]: {} | undefined },
  K = keyof O,
> = K extends keyof O
  ? O[K] extends undefined | Record<string, never>
    ? [K]
    : [K, O[K]]
  : never
