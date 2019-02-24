# Compressor.io CLI
CLI helper for compressing image using compressor.io

## Version
0.1.0

## Requirement
This app based on Node Js so you must install Node Js package to run this

## Usage
Clone this repository into your local machine
``` bash
git clone https://github.com/alfatta/compressor-io-cli.git
```

Install dependencies
``` bash
cd compressor-io-cli
npm install
```
Copy your image that you want to compress into 'source' folder

If you want to check what file will be processed, you can run
``` bash
npm run list
```

To start compressing, run:
``` bash
npm run start
```
and wait until finish

Your compressed image will be appeared in 'destination' folder

## Release Notes
* 0.1.0 (25/2/19)
  * Using async each with limit 1
  * List file give output string not json
* 0.0.1 (24/2/19)
  * Initial Release
