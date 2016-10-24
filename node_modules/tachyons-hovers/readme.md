# tachyons-hovers 2.3.2

Performance based css module.

#### Stats

506 | 15 | 16
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev tachyons-hovers
```

#### With Git

```
git clone https://github.com/tachyons-css/tachyons-hovers
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "tachyons-hovers";
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
<link rel="stylesheet" href="path/to/module/css/tachyons-hovers">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

  HOVER EFFECTS


*/
/*

  Dim element on hover by adding the dim class.

*/
.dim { opacity: 1; transition: opacity .15s ease-in; }
.dim:hover, .dim:focus { opacity: .5; transition: opacity .15s ease-in; }
.dim:active { opacity: .8; transition: opacity .15s ease-out; }
/*

  Hide child & reveal on hover:

  Put the hide-child class on a parent element and any nested element with the
  child class will be hidden and displayed on hover or focus.

  <div class="hide-child">
    <div class="child"> Hidden until hover or focus </div>
    <div class="child"> Hidden until hover or focus </div>
    <div class="child"> Hidden until hover or focus </div>
    <div class="child"> Hidden until hover or focus </div>
  </div>
*/
.hide-child .child { opacity: 0; transition: opacity .15s ease-in; }
.hide-child:hover  .child, .hide-child:focus  .child, .hide-child:active .child { opacity: 1; transition: opacity .15s ease-in; }
.underline-hover:hover, .underline-hover:focus { text-decoration: underline; }
/* Can combine this with overflow-hidden to make background images grow on hover
 * even if you are using background-size: cover */
.grow { transition: transform .2s; }
.grow:hover { transform: scale( 1.05 ); }
.grow-large { transition: transform .2s; }
.grow-large:hover { transform: scale( 1.2 ); }
/* Add pointer on hover */
.pointer:hover { cursor: pointer; }
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

