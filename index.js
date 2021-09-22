const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const util = require('util');
const fs = require("fs");
require('dotenv').config();

const rcpt = process.argv[2];
const amnt = process.argv[3];

async function main () {
  const provider = new WsProvider(process.env.API_WS);
  const api = await ApiPromise.create({ provider });

  const password=process.env.PASSWORD
  const keyring = new Keyring({ type: 'sr25519' , ss58Format: 2 });
  let fileContent = fs.readFileSync(process.env.KEYFILE, "utf8");
  const keyInfo =  JSON.parse(fileContent)

  const newDeri = keyring.addFromJson(
    keyInfo
  )
  newDeri.decodePkcs8(password);

  let noncev = await api.rpc.system.accountNextIndex(newDeri.address);

  const hash = await api.tx.balances
    .transfer(rcpt, amnt)
    .signAndSend(newDeri, { noncev });

  console.log('Payed out with hash ', hash.toHex())

  process.exit(0);
}

main()