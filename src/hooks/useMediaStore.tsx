import { Movie, MovieShort, Show, ShowShort } from '../types/ororo'
import { createStore } from '../libs/createStore'

export type Store = {
  focusedMedia?: MovieShort | ShowShort
  selectedMedia?: MovieShort | ShowShort
  playingMovie?: Movie
  playingShow?: Show & { episodeId: number }
}

export const { StoreProvider: MediaStoreProvider, useStore: useMediaStore } =
  createStore<Store>({})
