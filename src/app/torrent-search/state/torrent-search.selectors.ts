import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITorrentSearchState } from "./torrent-search.reducer";

const getTorrentSearchFeatureState = createFeatureSelector<ITorrentSearchState>('torrentSearch');

export const getAllProviders = createSelector(
  getTorrentSearchFeatureState,
  state => state.allProviders,
);

export const getEnabledProviders = createSelector(
  getTorrentSearchFeatureState,
  state => state.enabledProviders,
);
