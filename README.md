# substrate-sender
This scripts transfers given amount of tokens to given recipient.  
Tested with Padlock testnet.

## Installation:  
`npm install`

## Usage:  
`npm run start <recipient address> <amount>`  
Amount given in 1/1000000000000 parts of a Unit, so `npm run start <recipient address> 1000000000000`  will send 1 Unit

## Configuration  
Script can be configured via .env file.  
It contains 3 variables:

- `PASSWORD` - Password of keyfile
- `KEYFILE`  - Location of keyfile
- `API_WS`   - WebSocket URL of API endpoint
