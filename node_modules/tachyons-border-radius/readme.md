# tachyons-border-radius 4.1.3

Border radius CSS module for Tachyons

#### Stats

475 | 40 | 56
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-border-radius
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-border-radius
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-border-radius";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-border-radius">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

   BORDER RADIUS

   Base:
     br   = border-radius

   Modifiers:
     0    = 0/none
     1    = 1st step in scale
     2    = 2nd step in scale
     3    = 3rd step in scale
     4    = 4th step in scale
     -100 = 100%


   Media Query Extensions:
     -ns = not-small
     -m  = medium
     -l  = large

*/
.br0 { border-radius: 0; }
.br1 { border-radius: .125rem; }
.br2 { border-radius: .25rem; }
.br3 { border-radius: .5rem; }
.br4 { border-radius: 1rem; }
.br-100 { border-radius: 100%; }
.br--bottom { border-top-left-radius: 0; border-top-right-radius: 0; }
.br--top { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.br--right { border-top-left-radius: 0; border-bottom-left-radius: 0; }
.br--left { border-top-right-radius: 0; border-bottom-right-radius: 0; }
@media screen and (min-width: 48em) {
 .br0-ns { border-radius: 0; }
 .br1-ns { border-radius: .125rem; }
 .br2-ns { border-radius: .25rem; }
 .br3-ns { border-radius: .5rem; }
 .br4-ns { border-radius: 1rem; }
 .br-100-ns { border-radius: 100%; }
 .br--bottom-ns { border-top-left-radius: 0; border-top-right-radius: 0; }
 .br--top-ns { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
 .br--right-ns { border-top-left-radius: 0; border-bottom-left-radius: 0; }
 .br--left-ns { border-top-right-radius: 0; border-bottom-right-radius: 0; }
}
@media screen and (min-width: 48em) and (max-width: 64em) {
 .br0-m { border-radius: 0; }
 .br1-m { border-radius: .125rem; }
 .br2-m { border-radius: .25rem; }
 .br3-m { border-radius: .5rem; }
 .br4-m { border-radius: 1rem; }
 .br-100-m { border-radius: 100%; }
 .br--bottom-m { border-top-left-radius: 0; border-top-right-radius: 0; }
 .br--top-m { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
 .br--right-m { border-top-left-radius: 0; border-bottom-left-radius: 0; }
 .br--left-m { border-top-right-radius: 0; border-bottom-right-radius: 0; }
}
@media screen and (min-width: 64em) {
 .br0-l { border-radius: 0; }
 .br1-l { border-radius: .125rem; }
 .br2-l { border-radius: .25rem; }
 .br3-l { border-radius: .5rem; }
 .br4-l { border-radius: 1rem; }
 .br-100-l { border-radius: 100%; }
 .br--bottom-l { border-radius-top-left: 0; border-radius-top-right: 0; }
 .br--top-l { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
 .br--right-l { border-top-left-radius: 0; border-bottom-left-radius: 0; }
 .br--left-l { border-top-right-radius: 0; border-bottom-right-radius: 0; }
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

