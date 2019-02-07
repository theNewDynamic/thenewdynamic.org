<!-- https://github.com/egoist/maid -->
## build

Run tasks `hugo` and `webpack_watch` in parallel after this.


## deploy

Run task `webpack`, and then run `hugo`.

## os
```js
var os = require('os');
```

## hugo

Run task os before this.

```js

const { spawn } = require('child_process');
//const hugo_source = `./bin/hugo.macos`;
const hugo_source = 'hugo';
//const hugo_source = require('hugo-bin');
const args = process.argv.slice(3)
const hugoArgs = args.length === 0 ? ['--gc', '--minify'] : args;

console.log('flags: ', hugoArgs)

const hugo = spawn(hugo_source, hugoArgs, { 
  stdio: "pipe"
});

hugo.stdout.on('data', (data) => {
  console.log(`${data}`);
});

hugo.on("close", function(code) {
  if (code === 0) {
    console.log('build complete');
  } else {
    console.log('build failed');
  }
});

```

## webpack

```bash
NODE_ENV=production webpack
```

## webpack_watch

```bash
NODE_ENV=development webpack --progress --watch
```