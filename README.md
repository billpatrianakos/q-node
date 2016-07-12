# QClient.js

> Node.js API wrapper for Aplo's Q API

__IMPORTANT:__ The current 0.3.0 release includes support for a single API endpoint. It is not production ready. The maintenance of this package is now being run by an individual, not a company so contributions would be appreciated.


## What is Q?

Q, not to be confused with the Node.js promise library, is the internal insurance quoting API the company formerly known as Aplo created to get quotes. Q provides endpoints for generating "raw" insurance quotes, personalized quotes including ACA/Obamacare subsidies, and the ability to check for active insurance agent licenses.

To use Q you'll need to [sign up for an account and generate an API Client ID and Secret Token](https://q.aploquote.com).

## Installation

Installation is simple through npm: `npm install qclient`

## Usage

```
npm install q-client --save
```

Once installed you can get insurance quotes using the `getSubsidy` method.

## Available Endpoints

### "Raw" Quotes

`getSubsidy` will return an array of quotes as well as the subsidy available to you through the Affordable Care act.

```js
var QClient = require('q-client');
var quotes  = new QClient(clientID, secretToken);

// Get quotes
var demographics = {
  zip_code: 60181,
  age: 30,
  household_income: 20000,
  tobacco_use: false 
}
quotes.getSubsidy('il', 60181, demographics, function(err, response) {
  if (err) {
    // handle error
  } else {
    // you get a JSON response (see docs: https://q.aplo.me/docs/)
  }
});
```

### Subsidy Estimates

The `getSubsidy` method will return a subsidy property but it will also return an array of insurance plance. Plans for a method that only returns the subsidy are in the works.

### License Verification

Plans on hold.

## Contributing and Development

Follow the existing code style and the standard GitHub contribution steps. 2-space soft tabs and comment your code are the golden rules.

### Branching Strategy

* `master` - The latest release. This is what you'll get when you NPM install
* `release` - A testing branch
* `develop` - This is where new features are developed

### Testing

__You'll get extra points if you contribute to our test suite. We really take notice of that.__

## License

Q is licensed under the MIT license. You may have unlimited use of it for personal or commercial purposes, free of charge, with no strings attached. You can change it and share it or keep those changes to yourself. You could make money off this code. You can basically do anything you want so long as its legal and doesn't hurt anyone. __Here's the catch:__ We assume no liability if you blow yourself up. That's all.

```
The MIT License (MIT)

Copyright (c) 2015 - 2016 Bill Patrianakos
Copyright (c) 2015 Aplo, LLC (https://q.aplo.me/docs)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
