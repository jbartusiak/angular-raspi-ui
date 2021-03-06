import * as fromRoot from './../../state/app.state';
import { TorrentClientActions, TorrentClientActionTypes} from './torrent-client.actions';
import { Torrent } from '../../torrent-search/state';

export interface ITorrentItem {
  downloadDir: string;
  downloadedEver: number;
  eta: number;
  id: number;
  name: string;
  percentDone: number;
  peersConnected: number;
  peersSendingToUs: number;
  rateDownload: number;
  rateUpload: number;
  status: number;
  totalSize: number;
}

export interface ITorrentClientState {
  torrentToDownload: Torrent;
  torrents: ITorrentItem[];
  error: string;
}

export interface State extends fromRoot.State {
  torrentClient: ITorrentClientState;
}

const initialState: ITorrentClientState = {
  torrentToDownload: null,
  torrents: [],
  error: null,
};

export const reducer = (state= initialState, action: TorrentClientActions): ITorrentClientState => {
  switch (action.type) {
    case TorrentClientActionTypes.LoadTorrentsSuccess:
      return {
        ...state,
        torrents: action.payload,
      };
    case TorrentClientActionTypes.LoadTorrentsFail:
      return {
        ...state,
        error: action.payload,
      };
    case TorrentClientActionTypes.AddTorrent:
      return {
        ...state,
        torrentToDownload: action.payload,
      };
    case TorrentClientActionTypes.ClearTorrent:
      return {
        ...state,
        torrentToDownload: null,
      };
    default:
      return state;
  }
};
