[![npm version](https://img.shields.io/npm/v/sphero-connector-http.svg?style=flat)](https://www.npmjs.org/package/sphero-connector-http)
[![Dependency Status](https://david-dm.org/chrkhl/sphero-connector-http.svg)](https://david-dm.org/chrkhl/sphero-connector-http)
[![devDependency Status](https://david-dm.org/chrkhl/sphero-connector-http/dev-status.svg)](https://david-dm.org/chrkhl/sphero-connector-http#info=devDependencies)
[![Build Status](https://travis-ci.org/chrkhl/sphero-connector-http.svg?branch=master)](https://travis-ci.org/chrkhl/sphero-connector-http)
[![Coverage](https://coveralls.io/repos/github/chrkhl/sphero-connector-http/badge.svg?branch=master)](https://coveralls.io/github/chrkhl/sphero-connector-http?branch=master)


# Sphero Connector HTTP

This is a small CLI tool to run an [express](https://github.com/expressjs/express) based HTTP server for connecting and controlling Sphero toys via HTTP requests. It uses [Sphero Connector Core](https://github.com/chrkhl/sphero-connector-http), a tiny wrapper around the [unofficial Sphero V2 API](https://github.com/igbopie/spherov2.js) for communicating with Sphero toys.


## Getting Started

Install Sphero-Connector-HTTP via [npm](https://yarnpkg.com/en/package/jest):

```bash
npm install --save sphero-connector-http
```

Add npm run script to your `package.json`:

```json
{
  "scripts": {
    "sphero-connector-http": "sphero-connector-http"
  }
}
```

Add the following section to your `package.json`:

```json
{
  "sphero-connector": {
    "type": "http"
  }
}
```

Finally, run `npm run sphero-connector-http` and sphero-connector-http will start its express server listening on port 3000.

## Configuration

### Port

By default, sphero-connector-http will listen on port 3000 for incoming HTTP requests.
You can change the port number (range from 3.000 to 40.000) in the `sphero-connector` section of your package.json as follows:

```json
{
  "sphero-connector": {
    "type": "http",
    "port": 7331
  }
}
```

### Connect with toy on startup

To auto-connect with a Sphero toy on start, you can specify the toy type and name in your package.json.

```json
{
  "sphero-connector": {
    "type": "http",
    "connectOnStart": {
      "toyType": "SpheroMini",
      "toyName": "SM-0815"
    }
  }
}
```

Valid values for `toyType` are: `SpheroMini`, `LightningMcQueen`, `R2D2`, `R2Q5`, `BB9E`.
The `toyName` option is currently only supported for `toyType: "SpheroMini"`.


### API

* `POST /wake`
* `POST /sleep`
* `POST /main-led-color/random`
* `POST /main-led-color/hex`


## License

Please be aware of the licenses of the components used in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
