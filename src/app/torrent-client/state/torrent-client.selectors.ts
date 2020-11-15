import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITorrentClientState } from './torrent-client.reducer';

const getTorrentClientFeatureState = createFeatureSelector<ITorrentClientState>('torrentClient');

export const getError = createSelector(
  getTorrentClientFeatureState,
  state => state.error,
);

export const getTorrents = createSelector(
  getTorrentClientFeatureState,
  state => state.torrents,
);

export const getTorrentToDownload = createSelector(
  getTorrentClientFeatureState,
  state => state.torrentToDownload,
);
