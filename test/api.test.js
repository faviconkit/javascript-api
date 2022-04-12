import crypto from 'node:crypto'

import test from 'ava'
import got from 'got'
import Chance from 'chance'
import createFaviconKitApi, {
	md5Base64,
	durationOrTimestampToSeconds,
	createSignatureToken,
	createUrl,
	iconUrl,
} from '../src/api.js'

const chance = new Chance()
const UNIT_TESTING_SECRET = 'b3beae47-b99e-4f0b-818b-c74cf454cb0b'
const UNIT_TESTING_ACCOUNT = 'unit-testing'
const UNIT_TESTING_EXPIRES = 9_999_999_999

/*-----------------------------------------------------------------------------
	TESTS
-----------------------------------------------------------------------------*/
test('md5Base64 creates correct output', t => {
	const chance = new Chance()
	const input = chance.word()
	const correct = crypto
		.createHash('md5')
		.update(input)
		.digest('base64')
	const computed = md5Base64(input, {asString: true})
	t.is(computed, correct)
})

test('durationOrTimestampToSeconds', t => {
	const oneWeekSeconds = 7 * 24 * 60 * 60
	const nowSeconds = Math.floor(Date.now() / 1000)
	const nextWeekSeconds = nowSeconds + oneWeekSeconds
	t.is(durationOrTimestampToSeconds('1w', nowSeconds), nextWeekSeconds)
	t.is(durationOrTimestampToSeconds(nextWeekSeconds), nextWeekSeconds)
})

test('createSignatureToken creates a the correct token', t => {
	const path = '/test'
	const token = createSignatureToken(path, {
		secret : UNIT_TESTING_SECRET,
		expires: UNIT_TESTING_EXPIRES,
	})
	t.is(token, 'JImz4oefV5wUq98VKBRzgg')
})

test('createProtectedUrl creates a working URL', async t => {
	const path = '/apple.com/64'
	const iconUrl = createUrl(path, {
		account: UNIT_TESTING_ACCOUNT,
		secret : UNIT_TESTING_SECRET,
		expires: UNIT_TESTING_EXPIRES,
		https  : false,
	})

	const unsignedUrl = createUrl(path, {secret: null, https: false})
	await Promise.all([
		t.notThrowsAsync(async () => {
			const response = await got(iconUrl)
			t.is(response.statusCode, 200)
			t.is(response.headers['content-type'], 'image/png')
			t.pass('Signed URL returns 200 OK with image/png')
		}),
		t.notThrowsAsync(async () => {
			const response = await got(unsignedUrl, {
				throwHttpErrors: false,
				followRedirect : false,
			})
			t.is(response.statusCode, 403)
			t.pass('Unsigned URL returns 403')
		}),
	])
})

test('iconUrl creates same URL for target domain and target URL', t => {
	const domain = chance.domain()
	const path = chance.sentence({words: 5}).replace(' ', '/')
	t.is(iconUrl(domain), iconUrl(`https://${domain}/${path}`))
})

test('createFaviconApi throws an error if account is unspecified', t => {
	t.throws(() => createFaviconKitApi({account: null}))
})

test('createFaviconApi.iconUrl creates an unsigned URL', async t => {
	const api = createFaviconKitApi({
		account: UNIT_TESTING_ACCOUNT,
		secret : null,
		https  : false,
	})
	t.is(typeof api.iconUrl, 'function')
	const url = api.iconUrl('https://www.apple.com/', 64)
	const result = await got(url, {throwHttpErrors: false})
	t.is(result.statusCode, 403)
})

test('createFaviconApi.iconUrl creates a signed URL', async t => {
	const api = createFaviconKitApi({
		account: UNIT_TESTING_ACCOUNT,
		secret : UNIT_TESTING_SECRET,
		https  : false,
	})
	t.is(typeof api.iconUrl, 'function')
	const url = api.iconUrl('https://www.apple.com/', 64)
	const result = await got(url, {throwHttpErrors: false})
	t.is(result.statusCode, 200)
})
