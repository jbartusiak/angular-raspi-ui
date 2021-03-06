export interface TorrentItemFile {
  bytesCompleted: number;
  length: number;
  name: string;
}

export interface TorrentItemFileStats {
  bytesCompleted: number;
  priority: number;
  wanted: boolean;
}

export interface PeerDetails {
  address: string;
  clientIsChoked: boolean;
  clientIsInterested: boolean;
  clientName: string;
  flagStr: string;
  isDownloadingFrom: boolean;
  isEncrypted: boolean;
  isIncoming: boolean;
  isUTP: boolean;
  isUploadingTo: boolean;
  peerIsChoked: boolean;
  peerIsInterested: boolean;
  port: number;
  progress: number;
  rateToClient: number;
  rateToPeer: number;
}

export interface PeerSource {
  fromCache: number;
  fromDht: number;
  fromIncoming: number;
  fromLpd: number;
  fromLtep: number;
  fromPex: number;
  fromTracker: number;
}

export interface TorrentItemDetails {
  activityDate: number;
  addedDate: number;
  bandwidthPriority: number;
  comment: string;
  corruptEver: number;
  creator: string;
  dateCreated: number;
  desiredAvailable: number;
  doneDate: number;
  downloadDir: string;
  downloadLimit: number;
  downloadLimited: boolean;
  downloadedEver: number;
  error: number;
  errorString: string;
  eta: number;
  etaIdle: number;
  files: TorrentItemFile[];
  fileStats: TorrentItemFileStats[];
  hashString: string;
  haveUnchecked: number;
  haveValid: number;
  honorsSessionLimits: boolean;
  id: number;
  isFinished: boolean;
  isPrivate: boolean;
  isStalled: boolean;
  leftUntilDone: number;
  magnetLink: string;
  manualAnnounceTime: number;
  maxConnectedPeers: number;
  metadataPercentComplete: number;
  name: string;
  'peer-limit': number;
  peers: PeerDetails[];
  peersConnected: number;
  peersFrom: PeerSource;
  peersGettingFromUs: number;
  peersSendingToUs: number;
  percentDone: number;
  pieceCount: number;
  pieceSize: number;
  priorities: number[];
  queuePosition: number;
  rateDownload: number;
  rateUpload: number;
  recheckProgress: number;
  secondsDownloading: number;
  secondsSeeding: number;
  seedIdleLimit: number;
  seedIdleMode: number;
  seedRatioLimit: number;
  seedRatioMode: number;
  sizeWhenDone: number;
  startDate: number;
  status: number;
  totalSize: number;
  torrentFile: string;
  uploadedEver: number;
  uploadLimit: number;
  uploadLimited: boolean;
  uploadRatio: number;
  wanted: number[];
  webseeds: [];
  webseedsSendingToUs: number;
}
