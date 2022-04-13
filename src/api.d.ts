import {NonNegativeInteger} from 'type-fest'

export type Options = {
  account?: string;
  secret?: string;
  expires?: string | number;
  domain?: string;
  https?: boolean;
}

export type UrlString = `${'http' | 'https'}://${string}`

declare function createFaviconKitApi(options?: Options): {
  iconUrl<T extends number>(domainOrUrl: string, size: NonNegativeInteger<T>, options?: Options): UrlString;
}

export default createFaviconKitApi
