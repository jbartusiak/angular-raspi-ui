import { ITorrentItem } from "../state/torrent-client.reducer";

export interface LoadTorrentResponse {
  code: number;
  message: string;
  torrents: ITorrentItem[];
}
