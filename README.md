<center>
<img src="https://api.faviconkit.com/faviconkit.com/64" alt="Favicon Kit" height="64px"/>
</center>

# Favicon Kit API for JavaScript Developers <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" height="16px"/> <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="16px"/>

> Get and embed high quality Favicons from any web site with one simple, reliable API.

# About Favicon Kit

[Favicon Kit](https://faviconkit.com/?ref=readme) is the easiest way to grab high quality Favicons from any web site and embed them in your own app.

It does all the heavy lifting of fetching Favicons from the world’s websites, and then distributes icons globally for instant, easy and privacy-friendly access.

Here are some of its fabulous features:

### Favicon Kit Features
|    |                              |                                    |
|----|------------------------------|------------------------------------|
| 🖼 | \<img src="faviconkit">       | Embed Favicons just like ordinary images. |
| ✅ | Always 200 OK                 | Never shows a broken link image – if things go wrong, you get a fallback icon. |
| 💎 | Brilliant HDPI Favicons       | Supports all available icon sizes, from 16 to 1024 pixels and beyond, which makes your app look brilliant on high resolution displays. |
| 📦 | Unpacks .ico files            | We unpack all icon sizes contained in `.ico` files and convert them to PNGs.|
| 🤓 | Compatible                    | Detects favico.ico, Apple Touch icons, web app manifest, social media profile icons, app icons and many more sources |
| 🕶 | Privacy Compliant             | Shield users from leaving unwanted fingerprints on hundreds of web sites |
| 🏎 | Hyperfast                     | Delivers icons in way under a second, in most cases grabs new icons in less than two.

# API Installation & Usage

## Get your free Favicon Kit Account ID

No password needed: [sign up or log in to your Dashboard](https://faviconkit.com/?ref=readme) to get your own free account ID.

## Add Favicon Kit to your project
```sh
npm add @faviconkit/api
```

## Get a Favicon URL

```js
import createFaviconKitApi from '@faviconkit/api'

const faviconkit = createFaviconKitApi({
  account: 'MY-FAVICONKIT-ACCOUNT' // get your account ID from https://faviconkit.com
})

const githubIconUrl = faviconkit.iconUrl('https://github.com', 64)
// -> https://MY-FAVICONKIT-ACCOUNT.faviconkit.com/github.com/64
```

<img width="32" height="32" src="data:image/png;base64,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" />

(Showing a 64×64 pixels icon at 32×32 on-screen size for 2x pixel density, which gives a brilliant appearance on HDPI devices)

Voilá, Favicons!
