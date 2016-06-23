# QClient.js

> Node.js API wrapper for Aplo's Q API

__Please Note:__ QClient currently only supports the `/plans/` endpoint which returns a subsidy estimate and an array of insurance plans based on the eligibility data you pass to it. Support for additional endpoints are planned for future releases.

## What is Q?

Q, not to be confused with the Node.js promise library, is our internal insurance quoting API that we've decided to open up publicly. Q provides endpoints for generating "raw" insurance quotes, personalized quotes including ACA/Obamacare subsidies, and the ability to check for active insurance agent licenses.

To use Q you'll need to [sign up for an account and generate an API Client ID and Secret Token](https://q.aploquote.com).

## Installation

Installation is simple through npm: `npm install qclient`

## Usage

...

## Available Endpoints

### "Raw" Quotes

### Subsidy Estimates

### License Verification

## Contributing and Development

### Branching Strategy

### Testing

__You'll get extra points if you contribute to our test suite. We really take notice of that.__

## License

Q is licensed under the MIT license. You may have unlimited use of it for personal or commercial purposes, free of charge, with no strings attached. You can change it and share it or keep those changes to yourself. You could make money off this code. You can basically do anything you want so long as its legal and doesn't hurt anyone. __Here's the catch:__ We assume no liability if you blow yourself up. That's all.

```
The MIT License (MIT)

Copyright (c) 2015 Bill Patrianakos
Copyright (c) 2015 Aplo, LLC (https://aploquote.com)

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
