# tachyons-opacity 1.0.0

Tachyons CSS module for setting opacity

#### Stats

122 | 13 | 13
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-opacity
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-opacity
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-opacity";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-opacity">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

  Opacity

*/
.o-100 { opacity: 1; }
.o-90 { opacity: .9; }
.o-80 { opacity: .8; }
.o-70 { opacity: .7; }
.o-60 { opacity: .6; }
.o-50 { opacity: .5; }
.o-40 { opacity: .4; }
.o-30 { opacity: .3; }
.o-20 { opacity: .2; }
.o-10 { opacity: .1; }
.o-05 { opacity: .05; }
.o-025 { opacity: .025; }
.o-0 { opacity: 0; }
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

