# tachyons-floats 2.0.5

Performance based css module.

#### Stats

418 | 12 | 20
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-floats
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-floats
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-floats";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-floats">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/* Media Query Variables */
/*

   FLOATS

   1. Floated elements are automatically rendered as block level elements.
      Setting floats to display inline will fix the double margin bug in
      ie6. You know... just in case.

   2. Don't forget to clearfix your floats with .cf

   Base:
     f = float

   Modifiers:
     l = left
     r = right
     n = none

   Media Query Extensions:
     -ns = not-small
     -m  = medium
     -l  = large

*/
.fl { float: left; _display: inline; }
.fr { float: right; _display: inline; }
.fn { float: none; }
@media screen and (min-width: 48em) {
 .fl-ns { float: left; display: inline; }
 .fr-ns { float: right; display: inline; }
 .fn-ns { float: none; }
}
@media screen and (min-width: 48em) and (max-width: 64em) {
 .fl-m { float: left; display: inline; }
 .fr-m { float: right; display: inline; }
 .fn-m { float: none; }
}
@media screen and (min-width: 64em) {
 .fl-l { float: left; display: inline; }
 .fr-l { float: right; display: inline; }
 .fn-l { float: none; }
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

