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

export const getEnabledProvidersBindable = createSelector(
  getTorrentSearchFeatureState,
  state => {
    return state.allProviders.map(el => {
      if (state.enabledProviders.indexOf(el.name) !== -1) {
        return {
          ...el,
          enabled: true,
        }
      }
      else return {
        ...el,
        enabled: false
      }
    })
  }
)

export const getQuery = createSelector(
  getTorrentSearchFeatureState,
  state => state.query,
)
