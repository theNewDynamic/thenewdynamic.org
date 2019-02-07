# The New Dynamic Hugo Starter

This is a starter repo for The New Dynamic's web projects. Do with as you wish, but keep in mind that everything here is designed for our internal workflow.

We use a [Changelog](https://github.com/theNewDynamic/hugo-starter/blob/master/CHANGELOG.md) on all of our projects. Please see that file for updates.

## tools

 - [Hugo](http://gohugo.io/), to generate HTML
 - [Webpack 4+](https://webpack.js.org/)
 - Prettier (code formatting, wip)
 - PostCSS | [TailwindsCSS](https://tailwindcss.com/) (library of JS-based CSS classes ) | [PurgeCSS](https://www.purgecss.com/) (removes unused CSS)
 - JS: [Turbolinks](https://github.com/turbolinks/turbolinks) sometimes (HTML5 History API for faster navigation)
 - JS: [Lazysizes](https://github.com/aFarkas/lazysizes) (lazy asset loading)
 - [KyleAMathews/typefaces](https://github.com/KyleAMathews/typefaces) (load OS fonts locally with one little `require`)

## To Use

`git clone https://github.com/theNewDynamic/hugo-starter.git yourprojectname`

`cd yourprojectname`

`rm -rf .git`

`git init`

`git add .`

`git commit -m "initial commit"`

`git remote add origin https://github.com/theNewDynamic/YOURPROJECTNAME.git`

`git push -u origin master`

`git submodule add https://github.com/theNewDynamic/hugo-layout_module-base.git layout_modules/hugo-layout_module-base`

repeat for additional modules

Add [theme component](https://gohugo.io/themes/theme-components) to config.toml:

- `theme = ["hugo-layout_module-base", "hugo-layout_module-nameofmodule"]`

_Note. Hugo uses the "themes" directory by default. We've renamed that to `layout_modules`._


## Assets

To build JS files, we use webpack. The entry point is `./assets/index.js` for adding new scripts. 

- Add the script via Yarn (`yarn add scriptname -D`).
- Place a file in the JS folder and add the script, or, preferably, require/import it from its node module.
- Import the file (`import "./js/scriptname.js"`) in the index.js file.

### Building Asset Files with Webpack

1) `yarn install`
2) `yarn build-dev` or `yarn build` if you want to generate the file once.

### Fonts.

When possible, we use Kyle Mathews' [Typefaces](https://github.com/KyleAMathews/typefaces) so that we can server our font files locally. Just add the typeface to `assets/index.js` and run the webpack build, as above (`yarn build`). This will generate the font files into the `static/fonts` directory (which Hugo will automatically copy into the public directory) and generate a fonts CSS file, which then Hugo will minify and fingerprint into your head. 


### CSS

We use TailwindCSS and several PostCSS plugins to generate CSS. Most of your CSS will be utility classes in your templates. Hugo will not [rebuild](https://discourse.gohugo.io/t/regenerating-assets-directory-for-hugo-pipes/13175) your CSS file unless the file itself is changed. In a TailwindCSS context, most of your work occurs in templates, not in the CSS file. To make development easier, we've created a separate PostCSS [config](https://github.com/postcss/postcss-cli#config) file without PurgeCSS. However, this means you must run `yarn deploy` (as outline below) for you push your changes.

## Deployment

1) **Before deploying, run `yarn deploy` (or `hugo --gc` if you're not generating fonts or JS) to generate a minified, purged CSS file.** 
2) Check the `resources` folder into your repository.

### Other Notes

- PurgeCSS will fail if any of your templates are empty.
- If you add themes, you may need to add the file location in the PurgeCSS `content` configuration item. This is done for you, with a glob pattern, but it is something to be aware of.