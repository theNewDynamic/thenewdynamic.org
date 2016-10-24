# tachyons-white-space 3.0.2

Performance based css module.

#### Stats

186 | 12 | 12
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-white-space
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-white-space
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-white-space";
```

Then process the CSS using the [`tachyons-cli`](https://github.com/tachyons-css/tachyons-cli)

```sh
$ npm i -g tachyons-cli
$ tachyons-cli path/to/css-file.css > dist/t.css
```

#### Using the CSS

The built CSS is located in the `css` directory. It contains an unminified and minified version.
You can either cut and paste that css or link to it directly in your html.

```html
<link rel="stylesheet" href="path/to/module/css/tachyons-white-space">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

   WHITE SPACE

*/
.ws-normal { white-space: normal; }
.nowrap { white-space: nowrap; }
.pre { white-space: pre; }
@media screen and (min-width: 48em) {
 .ws-normal-ns { white-space: normal; }
 .nowrap-ns { white-space: nowrap; }
 .pre-ns { white-space: pre; }
}
@media screen and (min-width: 48em) and (max-width: 64em) {
 .ws-normal-m { white-space: normal; }
 .nowrap-m { white-space: nowrap; }
 .pre-m { white-space: pre; }
}
@media screen and (min-width: 64em) {
 .ws-normal-l { white-space: normal; }
 .nowrap-l { white-space: nowrap; }
 .pre-l { white-space: pre; }
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Authors

* [mrmrs](http://mrmrs.io)
* [johno](http://johnotander.com)

## License

MIT

