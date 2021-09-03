export interface TorrentSearchQuery {
  category: string;
  enabledProviders: string[];
  query: string;
  resultsLimit?: number;
}
