export interface TorrentFile {
  bytesCompleted: number,
  length: number,
  name: string;
  priority: number;
  wanted: boolean;
}
