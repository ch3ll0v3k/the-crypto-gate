### TheCryptoGate.com Blockchain API (BTC, ...)

[![npm version](https://badge.fury.io/js/the-crypto-gate.svg)](https://badge.fury.io/js/the-crypto-gate)

https://www.npmjs.com/package/the-crypto-gate
### Install:

```bash
npm i the-crypto-gate --save
```

```javascript
const theCryptoGate = require('the-crypto-gate');

const TCG = new theCryptoGate({
  apiKey: '<my-key>',
});

```

-----

#### Method: getAddressBalance
```javascript
const logger = require('mii-logger.js');


const res = await = TCG.getAddressBalance( '15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb' ));
console.json( res );

{
  "code": 200,
  "msg": "OK",
  "data": {
    "balance": 0.00137764,
    "confirmed": 0.00137764,
    "unconfirmed": 0
  }
}

const res = await = TCG.getAddressBalance( 'WRONG-ADDRESS' ));
console.json( res );

{
  "code": 500,
  "msg": "WRONG-ADDRESS has no matching Script",
  "data": {}
}

```


#### get-address-unspent
```javascript
const logger = require('mii-logger.js');

const res = await = TCG.getAddressUnspent( '15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb' ));
console.json( res );

{
  "code": 200,
  "msg": "OK",
  "data": [
    {
      "tx_hash": "40613da5d01929b24a7de66b499874f1f23a072bebd3935c81bdf7a1caeffa73",
      "tx_pos": 1,
      "height": 575219,
      "value": 137764,
      "balance": 0.00137764
    }
  ]
}

const res = await = TCG.getAddressUnspent( 'WRONG-ADDRESS' ));
console.json( res );

{
  "code": 500,
  "msg": "WRONG-ADDRESS has no matching Script",
  "data": {}
}

```

#### push-raw-transaction
```javascript
const logger = require('mii-logger.js');

const res = await = TCG.pushRawTransaction( '02000000016d97be4cf0fafccb85b37b ....' ));
console.json( res );

{
  "code": 200,
  "msg": "OK",
  "data": "c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935" // pushed transaction hash
}

const res = await = TCG.pushRawTransaction( 'EXISTING TRANSACTION-HASH' ));
console.json( res );

{
  "code": 500,
  "msg": "Transaction already in block chain",
  "data": {}
}
```

#### get-transaction-by-hash

```javascript
const logger = require('mii-logger.js');

const res = await = TCG.getTransactionByHash( '40613da5d01929b24a7de66b499874f1f23a072bebd3935c81bdf7a1caeffa73' ));
console.json( res );


{
  "code": 200,
  "msg": "OK",
  "data": {
    "transaction": {
      "txid": "40613da5d01929b24a7de66b499874f1f23a072bebd3935c81bdf7a1caeffa73",
      "hash": "40613da5d01929b24a7de66b499874f1f23a072bebd3935c81bdf7a1caeffa73",
      "version": 2,
      "size": 226,
      "vsize": 226,
      "weight": 904,
      "locktime": 0,
      "vin": [
        ...
      ],
      ...
    }
  }
}

const res = await = TCG.getTransactionByHash( 'WRONG-TRANSACTION-HASH' ));
console.json( res );

{
  "code": 400,
  "msg": "Not valid Transaction Hash",
  "data": {}
}

// Or if not found

{
  "code": 500,
  "msg": "No such mempool or blockchain transaction. Use gettransaction for wallet transactions",
  "data": {}
}

```

#### get-block-by-id

```javascript
const logger = require('mii-logger.js');

const res = await = TCG.getBlockByID( 575217 );
console.json( res );

{
  "code": 200,
  "msg": "OK",
  "data": {
    ...
  }
}

// on error
{
  "code": <code>,
  "msg": "<description>",
  "data": {}
}





