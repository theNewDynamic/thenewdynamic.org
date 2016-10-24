# tachyons-vertical-align 2.0.4

Performance based css module.

#### Stats

214 | 16 | 16
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-vertical-align
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-vertical-align
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-vertical-align";
```

Then process the CSS using the [`tachyons-cli`](https://github.com/tachyons-css/tachyons-cli)

```sh
$ npm i -g tachyons-cli
$ tachyons path/to/css-file.css > dist/t.css
```

#### Using the CSS

The built CSS is located in the `css` directory. It contains an unminified and minified version.
You can either cut and paste that css or link to it directly in your html.

```html
<link rel="stylesheet" href="path/to/module/css/tachyons-vertical-align">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

   VERTICAL ALIGN

*/
.v-base { vertical-align: baseline; }
.v-mid { vertical-align: middle; }
.v-top { vertical-align: top; }
.v-btm { vertical-align: bottom; }
@media screen and (min-width: 48em) {
 .v-base-ns { vertical-align: baseline; }
 .v-mid-ns { vertical-align: middle; }
 .v-top-ns { vertical-align: top; }
 .v-btm-ns { vertical-align: bottom; }
}
@media screen and (min-width: 48em) and (max-width: 64em) {
 .v-base-m { vertical-align: baseline; }
 .v-mid-m { vertical-align: middle; }
 .v-top-m { vertical-align: top; }
 .v-btm-m { vertical-align: bottom; }
}
@media screen and (min-width: 64em) {
 .v-base-l { vertical-align: baseline; }
 .v-mid-l { vertical-align: middle; }
 .v-top-l { vertical-align: top; }
 .v-btm-l { vertical-align: bottom; }
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

