import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITorrentSearchState } from './torrent-search.reducer';

const getTorrentSearchFeatureState = createFeatureSelector<ITorrentSearchState>('torrentSearch');

export const getAllProviders = createSelector(
  getTorrentSearchFeatureState,
  state => state.allProviders,
);

export const getEnabledProviders = createSelector(
  getTorrentSearchFeatureState,
  state => state.enabledProviders,
);

export const getError = createSelector(
  getTorrentSearchFeatureState,
  state => state.error,
);

export const getEnabledProvidersBindable = createSelector(
  getTorrentSearchFeatureState,
  state => state.allProviders.map(el => {
      if (state.enabledProviders.indexOf(el.name) !== -1) {
        return {
          ...el,
          enabled: true,
        };
      }
      else { return {
        ...el,
        enabled: false
      };
      }
    })
);

export const getQuery = createSelector(
  getTorrentSearchFeatureState,
  state => state.query,
);

export const getSearchResults = createSelector(
  getTorrentSearchFeatureState,
  state => state.results,
);

export const getCategory = createSelector(
  getTorrentSearchFeatureState,
  state => state.category,
);

export const getAllCategories = createSelector(
  getTorrentSearchFeatureState,
  state => state.categories,
);
