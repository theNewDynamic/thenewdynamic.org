<!-- https://github.com/egoist/maid -->
## dev

Run tasks `parcel_build`, and then run`hugo` and `parcel_watch` in parallel after this.

## deploy

Run task `parcel_build`, and then run `hugo`.

## parcel_watch

```bash
parcel watch ./assets/index.js --out-dir assets/output
```

## parcel_build

```bash
parcel build ./assets/index.js --out-dir assets/output --experimental-scope-hoisting
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

## os
```js
var os = require('os');
```

## chmod

```bash
chmod a+x ./bin/hugo.macos
```

## hugoUpdate

Update the Hugo Binaries to the specified version.

```py
import urllib.request
import tarfile
import zipfile
import os
import shutil
import sys

print('Updating Hugo binaries')

os.chdir("./bin")

## Need to set the version number.
version = sys.argv[2]
print(version)
tarNames = ["macOS","Linux"]
zipNames = ["Windows"]
urlBase = "https://github.com/gohugoio/hugo/releases/download/v{}/".format(version)

for i in range(len(tarNames)):
  tarFilename = "hugo_extended_{}_{}-64bit.tar.gz".format(version,tarNames[i])
  print("Processing: "+tarFilename)
  urllib.request.urlretrieve(urlBase+tarFilename, tarFilename)
  tar = tarfile.open(tarFilename, "r:gz")
  tar.extractall("temp")
  tar.close()
  shutil.copyfile("./temp/hugo", "hugo_extended.{}".format(tarNames[i].lower()))
  shutil.rmtree("temp")
  os.remove(tarFilename)
  i += 1

for i in range(len(zipNames)):
  zipFilename = "hugo_extended_{}_{}-64bit.zip".format(version,zipNames[i])
  print("Processing: "+zipFilename)
  urllib.request.urlretrieve(urlBase+zipFilename, zipFilename)
  with zipfile.ZipFile(zipFilename,"r") as zip_ref:
    zip_ref.extractall("temp")
  shutil.copyfile("./temp/hugo.exe", "hugo_extended-{}.exe".format(zipNames[i].lower()))
  shutil.rmtree("temp")
  os.remove(zipFilename)
  i += 1

print("Hugo has been updated to version {}.".format(version))

```