export interface TorrentFolder {
  name: string;
  folders: TorrentFolder[];
  files: TorrentFile[];
  parent?: TorrentFolder;
}

export interface TorrentFile {
  bytesCompleted: number;
  name: string;
  length: number;
  priority: number;
  wanted: boolean;
}
