import { TorrentItemDetails } from "./TorrentDetails";

export interface TorrentItemDetailsResponse {
  code: number,
  message: string,
  torrents: TorrentItemDetails[];
}
