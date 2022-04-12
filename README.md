<center>
<img src="https://api.faviconkit.com/faviconkit.com/64" alt="Favicon Kit" height="64px"/>
</center>

# Favicon Kit API for JavaScript Developers <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" height="16px"/> <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="16px"/>

> Get and embed high quality Favicons from any web site with one simple, reliable API.

# About Favicon Kit

[Favicon Kit](https://faviconkit.com/?ref=readme) is the easiest way to grab high quality Favicons from any web site and embed them in your own app.

Here are some of its fabulous features:

+ 🖼 **\<img src="faviconkit">.**
     Embed Favicons just like ordinary images.
+ ✅ **Always 200 OK.**
     Never a broken link image; if things go wrong, there’ll be a afallback icon
+ 🖥 **Brilliant on every device.**
     Always returns the best image format that works great with your platform (like .png, .svg or .jpeg)
+ 💎 **HDPI Favicons.**
     Supports all icon sizes from 16 to 1024 pixels and beyond, which makes your app look brilliant on high resolution displays!
+ 📦 **Unpacks .ico files.** 
     We unpack all icon sizes contained in `.ico` files and convert them to PNGs.
+ 🤓 **Compatible.** 
     Detects favico.ico, Apple Touch icons, web app manifest, social media profile icons, app icons and many more sources.
+ 🕶 **Privacy Compliant.**
     Shield users from leaving unwanted fingerprints on hundreds of web sites.
+ 🏎 **Hyperfast.**
     Loads icons in way under a second, grabs new ones in less than two.

# Installation & Usage

## Add Favicon Kit to your project
```sh
npm add @faviconkit/api
```

## Get your free Favicon Kit Account ID

[Sign up or log in to your Dashboard](https://faviconkit.com/) to get your own free account ID.

## Get a Favicon URL

```js
import createFaviconKitApi from '@faviconkit/api'

const faviconkit = createFaviconKitApi({
  account: 'MY-FAVICONKIT-ACCOUNT' // get your account ID from https://faviconkit.com
})

const githubIconUrl = faviconkit.iconUrl('https://github.com', 64)
// -> https://MY-FAVICONKIT-ACCOUNT.faviconkit.com/github.com/64
```
