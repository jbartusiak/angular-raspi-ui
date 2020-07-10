import * as fromRoot from './../../app.state';
import { TorrentClientActions, TorrentClientActionTypes} from "./torrent-client.actions";

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
  torrents: ITorrentItem[];
  error: string;
}

export interface State extends fromRoot.State {
  torrentClient: ITorrentClientState;
}

const initialState: ITorrentClientState = {
  torrents: [],
  error: null,
}

export const reducer = (state=initialState, action: TorrentClientActions): ITorrentClientState => {
  switch (action.type) {
    case TorrentClientActionTypes.LoadTorrentsSuccess:
      return {
        error: null,
        torrents: action.payload,
      }
    case TorrentClientActionTypes.LoadTorrentsFail:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}
