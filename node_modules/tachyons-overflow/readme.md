# tachyons-overflow 3.0.0

Performance based css module.

#### Stats

347 | 48 | 48
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-overflow
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-overflow
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-overflow";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-overflow">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

    OVERFLOW

 */
.overflow-visible { overflow: visible; }
.overflow-hidden { overflow: hidden; }
.overflow-scroll { overflow: scroll; }
.overflow-auto { overflow: auto; }
.overflow-x-visible { overflow-x: visible; }
.overflow-x-hidden { overflow-x: hidden; }
.overflow-x-scroll { overflow-x: scroll; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-visible { overflow-y: visible; }
.overflow-y-hidden { overflow-y: hidden; }
.overflow-y-scroll { overflow-y: scroll; }
.overflow-y-auto { overflow-y: auto; }
@media screen and (min-width: 48em) {
 .overflow-visible-ns { overflow: visible; }
 .overflow-hidden-ns { overflow: hidden; }
 .overflow-scroll-ns { overflow: scroll; }
 .overflow-auto-ns { overflow: auto; }
 .overflow-x-visible-ns { overflow-x: visible; }
 .overflow-x-hidden-ns { overflow-x: hidden; }
 .overflow-x-scroll-ns { overflow-x: scroll; }
 .overflow-x-auto-ns { overflow-x: auto; }
 .overflow-y-visible-ns { overflow-y: visible; }
 .overflow-y-hidden-ns { overflow-y: hidden; }
 .overflow-y-scroll-ns { overflow-y: scroll; }
 .overflow-y-auto-ns { overflow-y: auto; }
}
@media screen and (min-width: 48em) and (max-width: 64em) {
 .overflow-visible-m { overflow: visible; }
 .overflow-hidden-m { overflow: hidden; }
 .overflow-scroll-m { overflow: scroll; }
 .overflow-auto-m { overflow: auto; }
 .overflow-x-visible-m { overflow-x: visible; }
 .overflow-x-hidden-m { overflow-x: hidden; }
 .overflow-x-scroll-m { overflow-x: scroll; }
 .overflow-x-auto-m { overflow-x: auto; }
 .overflow-y-visible-m { overflow-y: visible; }
 .overflow-y-hidden-m { overflow-y: hidden; }
 .overflow-y-scroll-m { overflow-y: scroll; }
 .overflow-y-auto-m { overflow-y: auto; }
}
@media screen and (min-width: 64em) {
 .overflow-visible-l { overflow: visible; }
 .overflow-hidden-l { overflow: hidden; }
 .overflow-scroll-l { overflow: scroll; }
 .overflow-auto-l { overflow: auto; }
 .overflow-x-visible-l { overflow-x: visible; }
 .overflow-x-hidden-l { overflow-x: hidden; }
 .overflow-x-scroll-l { overflow-x: scroll; }
 .overflow-x-auto-l { overflow-x: auto; }
 .overflow-y-visible-l { overflow-y: visible; }
 .overflow-y-hidden-l { overflow-y: hidden; }
 .overflow-y-scroll-l { overflow-y: scroll; }
 .overflow-y-auto-l { overflow-y: auto; }
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

