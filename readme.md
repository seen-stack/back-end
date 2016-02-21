[![Build Status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

# Installation

```sh
git clone git@github.com:seen-stack/back-end.git
npm install
```
# Few notes: 
  * The default storage is MongoDB, but if you don't have mongo installed,
you can switch it to "memory" from [here](https://github.com/seen-stack/back-end/blob/master/app/config/config.json#L6)
  * Most of the classes are without a state. That's way they all have only static methods, removing the overhead of using the "new" keyword

## Compatibility

| Node Version |
| ---- |
| >= 4.x |

| NPM Version |
| ---- |
| >= 3.3.6 |

For more information about the structure and "how to", please refer to [Esrol Wiki](https://github.com/esrol/esrol-server-app/wiki) and [JSON API Wiki](http://jsonapi.org/format/)

## Status
Work in progress

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](https://github.com/esrol/esrol-initializer/blob/master/LICENSE)

[travis-image]: https://travis-ci.org/seen-stack/back-end.svg?branch=master
[travis-url]: https://travis-ci.org/seen-stack/back-end
[coveralls-image]: https://coveralls.io/repos/seen-stack/back-end/badge.svg
[coveralls-url]: https://coveralls.io/r/seen-stack/back-end