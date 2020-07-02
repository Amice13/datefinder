# Datefinder

## Description

It finds dates in your text with Node JS and returns extracted strings, start and end indices, the date object. It works for English, Russian and Ukrainian languages in the date range from 1900 to 2000.

## Parameters

Method can be called by `datefinder(text)`, where `text` is your text.

## Installation

```bash
npm install datefinder --save
```

## Usage

```js
const dateFinder = require('datefinder')

let text = 'Це трапилося 2 січня 2001 року. Я отримав листа, на якому була зазначена дата 12.12.2004.'

console.log(dateFinder(text))

```

Expected outcome:

<pre>
[ { startIndex: 12,
    endIndex: 30,
    string: ' 2 січня 2001 року',
    date: 2001-01-02T00:00:00.000Z },
  { startIndex: 78,
    endIndex: 88,
    string: '12.12.2004',
    date: 2004-12-12T00:00:00.000Z } ]
</pre>

## Acknowledgement

This package was inspired by [akoumjian's](https://github.com/akoumjian) [datefinder](https://github.com/akoumjian/datefinder).

## License

MIT
