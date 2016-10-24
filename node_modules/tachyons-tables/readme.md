# tachyons-tables 1.0.0

Tables CSS module for Tachyons

#### Stats

165 | 5 | 6
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-tables
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-tables
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-tables";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-tables">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

  TABLES

*/
.collapse { border-collapse: collapse; border-spacing: 0; }
.striped--moon-gray:nth-child(odd) { background-color: #aaa; }
.striped--moon-gray:nth-child(odd) { background-color: #ccc; }
.striped--light-gray:nth-child(odd) { background-color: #eee; }
.striped--near-white:nth-child(odd) { background-color: #f4f4f4; }
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

