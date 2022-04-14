import process from 'node:process'
import {URL} from 'node:url'

import md5 from 'md5'
import ms from 'ms'

/**
 * Compute the input’s (binary) MD5 hash and return it as Base64 encoded string.
 * Implemented here with a dependency because browsers don’t have
 * native MD5 functionality.
 *
 * @param {string} input - the input for which to return the md5Base64
 * @retunrs {string} - Base64 encoded string of input’s (binary) MD5 hash
 */
/*
 * The md5 `asString` option I’m using here is undocumented, I found it by reading the
 * source code at https://github.com/pvorb/node-md5/blob/2d876a38da854da5274008d6966740b176368da4/md5.js#L155
 * It returns the MD5 result as a string of characters, which we can then
 * use as input for `btoa`.
 */
export const md5Base64 = input => btoa(md5(input, {asString: true}))

/**
 * @param {string|number} stringOrNumber - a string or a number a target time.
 * 				In case of a string, that’s a time offset can be '1 minute', '1m', '2 weeks' or similar;
 * 				see the [ms](https://www.npmjs.com/package/ms) package for valid values.
 *        For numbers, it’s an absolute Unix timestamp (seconds since Jan 01 1970)
 * @param {number} startSeconds	- The start time, in seconds, to which to add the string offset;
 * 				defaults to the current time. Ignored if `stringOrNumber` is a number.
 *
 * @example
 * ```js
 * 	durationOrTimestampToSeconds('1w')	// 1 week from now
 * 	durationOrTimestampToSeconds(60)		// 1 minute from now
 * ```
 * @returns unix timestamp
 */
export const durationOrTimestampToSeconds = (
  stringOrNumber,
  startSeconds = Math.floor(Date.now() / 1000),
) => typeof stringOrNumber === 'string'
  ? startSeconds + Math.floor(ms(stringOrNumber) / 1000)
  : Math.floor(stringOrNumber)

/**
	 * Create a token to use as a signature in URLs
	 *
	 * @param {string} path The URL request path (without the domain name)
	 * @param {*} options
	 * @returns {string}
	 */
export const createSignatureToken = (path, {
  secret = process.env.FAVICONKIT_SECRET,
  expires = Number.MAX_SAFE_INTEGER,
} = {}) => {
  expires = durationOrTimestampToSeconds(expires)
  const hashable = secret + path + expires
  return md5Base64(hashable)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

export const createUrl = (path, {
  account = process.env.FAVICONKIT_ACCOUNT,
  secret = process.env.FAVICONKIT_SECRET,
  expires = process.env.FAVICONKIT_EXPIRE || (Number.MAX_SAFE_INTEGER / 1000),
  domain = process.env.FAVICONKIT_DOMAIN || 'faviconkit.com',
  https = true,
} = {}) => {
  const signatureArgs = secret
    ? `?token=${createSignatureToken(path, {secret, expires})}&expires=${durationOrTimestampToSeconds(expires)}`
    : ''
  const scheme = https ? 'https' : 'http'
  return new URL(`${path}${signatureArgs}`, `${scheme}://${account}.${domain}/`).href
}

export const iconUrl = (urlOrHostname, size, options) => {
  const hostname = urlOrHostname.includes('/')
    ? new URL(urlOrHostname).hostname
    : urlOrHostname
  return createUrl(`/${hostname}/${size}`, options)
}

const createFaviconKitApi = defaultOptions => {
  if (!(defaultOptions?.account || process.env.FAVICONKIT_ACCOUNT)) {
    throw new TypeError(`@faviconkit/api: Expected \`account\` to be a String, got \`${typeof defaultOptions?.account}\`. You can either pass \`account\` as a function argument or set the \`FAVICONKIT_ACCOUNT\` environment variable.`)
  }

  return {
    iconUrl: (path, size, options) => iconUrl(path, size, {...defaultOptions, ...options}),
  }
}

export default createFaviconKitApi
