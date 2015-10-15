# `parseargs.js`
What about parsing arguments allowing quotes in them? But beware that this library will not parse flags (`--` and `-`), flags will be returned as simple strings.

## Installation
```
npm install --save parseargs.js
```

## Example
```JS
var parse = require('parseargs.js');

var setInRedis = 'set name "Put your name here"';

console.log(parse(setInRedis)); // ['set', 'name', 'Put your name here']
```

## License
MIT
