# `parseargs.js`

What about parsing your args allowing quotes in them?

This library will not parse flags (`--` and `-`), just arguments. Flags will be returned as simple strings.

## Installation

`npm install --save parseargs.js`

## Example

```js
var parse = require('parseargs.js');
var redisInput = 'set name "Put your name here"';
var redisArguments = parse(redisInput);
console.log(redisArguments); // ['set', 'name', 'Put your name here']
```

## License

MIT
