import {expectType, expectError} from 'tsd'
import createFaviconKitApi, {UrlString} from '..'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const api = createFaviconKitApi({})
expectType<UrlString>(api.iconUrl('example.com', 64))
expectType<UrlString>(api.iconUrl('http://example.com', 64))
expectType<UrlString>(api.iconUrl('https://example.com', 64))
expectError(api.iconUrl('https://example.com', -64))
