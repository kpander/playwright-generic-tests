# Overview

Use this folder to create test cases for the playwright tests.

This is so we can test everything directly within this repo without having to create another project. It also provides an example implementation.

Assume that the package.json will either use the published package, or a direct link to a .tgz file so we can test locally.


# Setup

At least once:

```
$ npx playwright install chromium
```

## After you've updated tests in another folder

Make sure you run `npm pack` to create the .tgz file.

Then, in the sandbox folder:

```
$ npm run init
```

This will remove `node_modules` and re-install everything needed.


# Run tests

```
$ npm run test
```

or

```
$ npm run test:ui
```

