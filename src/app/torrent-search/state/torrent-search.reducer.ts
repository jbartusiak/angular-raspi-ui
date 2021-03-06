import * as fromRoot from '../../state/app.state';
import { TorrentSearchActions, TorrentSearchActionTypes } from './torrent-search.actions';

export interface Torrent {
  title: string;
  time: string;
  size: string;
  magnet: string;
  desc: string;
  provider: string;
}

export interface IOptions {
  [name: string]: boolean;
}

export interface ITorrentProvider {
  name: string;
  public: string;
  categories: string[];
}

export interface ITorrentSearchState {
  allProviders: ITorrentProvider[];
  categories: string[];
  category: string;
  enabledProviders: string[];
  error: string;
  query: string;
  results: Torrent[];
}

export interface State extends fromRoot.State {
  torrentSearch: ITorrentSearchState;
}

const initialState: ITorrentSearchState = {
  allProviders: [],
  categories: [],
  category: 'All',
  enabledProviders: [],
  error: '',
  query: '',
  results: [],
};

const composeCategories = (providers: ITorrentProvider[], enabledProviders: string[]): string[] => {
  const categories = [];
  providers
    .filter(provider => enabledProviders.indexOf(provider.name) !== -1)
    .map(el => el.categories)
    .forEach(providerCategories =>
      providerCategories.forEach(el => {
        if (categories.indexOf(el) === -1) {
          categories.push(el);
        }
      })
    );
  return categories;
};

export const reducer = (state = initialState, action: TorrentSearchActions): ITorrentSearchState => {
  switch (action.type) {
    case TorrentSearchActionTypes.LoadProvidersSuccess:
      return {
        ...state,
        allProviders: action.payload,
      };
    case TorrentSearchActionTypes.LoadProvidersFail:
      return {
        ...state,
        error: action.payload,
      };
    case TorrentSearchActionTypes.LoadEnabledProvidersSuccess:
    case TorrentSearchActionTypes.UpdateEnabledProvidersSuccess:
      const categories = composeCategories(state.allProviders, action.payload);
      return {
        ...state,
        error: '',
        enabledProviders: action.payload,
        categories,
        category: categories[0] || '',
      };
    case TorrentSearchActionTypes.LoadEnabledProvidersFail:
      return {
        ...state,
        error: action.payload,
      };
    case TorrentSearchActionTypes.UpdateQuery:
      return {
        ...state,
        query: action.payload,
      };
    case TorrentSearchActionTypes.UpdateCategory:
      return {
        ...state,
        category: action.payload,
      };
    case TorrentSearchActionTypes.PerformSearchSuccess:
      return {
        ...state,
        error: '',
        results: action.payload,
      };
    case TorrentSearchActionTypes.PerformSearchFail:
      return {
        ...state,
        error: action.payload,
        results: [],
      };
    default:
      return {...state};
  }
};
