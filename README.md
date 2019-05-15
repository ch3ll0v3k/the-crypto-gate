### TheCryptoGate.com Blockchain API (BTC, ...)
https://www.npmjs.com/package/the-crypto-gate

[![npm version](https://badge.fury.io/js/the-crypto-gate.svg)](https://badge.fury.io/js/the-crypto-gate)

-----
- Legend:
  - Methods:
    - [getAddressBalance](#method-getaddressbalance)
    - [getAddressUnspent](#method-getaddressunspent)
    - [pushRawTransaction](#method-pushrawtransaction)
    - [getTransactionByHash](#method-gettransactionbyhash)
    - [getBlockByID](#method-getblockbyid)
    - [estimateSmartFee](#method-estimatesmartfee)
    - [getKeyPair](#method-getkeypair)

-----

#### Install:

```bash
npm i the-crypto-gate --save
```

-----
#### Require && set-up apiKey:

```javascript
const theCryptoGate = require('the-crypto-gate');

const TCG = new theCryptoGate({
  apiKey: '<my-key>',
});

```

-----

#### Method: getAddressBalance
```javascript
const balanceRes = await = TCG.getAddressBalance( '15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb' ));

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": {
    "balance": 0.00137764,
    "confirmed": 0.00137764,
    "unconfirmed": 0
  }
}

```

```javascript
const balanceRes = await = TCG.getAddressBalance( 'WRONG-ADDRESS' ));

// On- (Error || Warning)
{
  "code": <code>, // !200
  "msg": "WRONG-ADDRESS has no matching Script",
}

```

-----

#### Method: getAddressUnspent

```
Get all unspent transactions (UTXO) from Address

WARNING:
  Only for advanced users. You can lose all your Crypto

```

```javascript
const res = await = TCG.getAddressUnspent( '15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb' ));

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": [
    {
      "tx_hash": "c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935",
      "tx_pos": 1,
      "height": 575219,
      "value": 137764, // amount ins Sat.
      "balance": 0.00137764
    }
  ]
}
```

```javascript
const res = await = TCG.getAddressUnspent( 'WRONG-ADDRESS' ));

// On- (Error || Warning)
{
  "code": <code>, // !200
  "msg": "WRONG-ADDRESS has no matching Script",
  "data": {}
}

```

-----

#### Method: pushRawTransaction

```
Broadcast your created Transaction into the Blockchain
```

```javascript
const res = await = TCG.pushRawTransaction( '02000000016d97be4cf0fafccb85b37b ....' ));

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": {
    // Pushed transaction hash
    "hash": "c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935",
  }
}

```

```javascript
const res = await = TCG.pushRawTransaction( 'EXISTING TRANSACTION-HASH' ));

// On- (Error || Warning)
{
  "code": <code>, // !200
  "msg": "Transaction already in block chain",
  "data": {}
}
```

-----

#### Method: getTransactionByHash

```
Fetch transaction from Blockchain by hash,

```

```javascript
const res = await = TCG.getTransactionByHash( 'c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935' ));

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": {
    "transaction": {
      "txid": "c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935",
      "hash": "c81bdf7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935",
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

```

```javascript
const res = await = TCG.getTransactionByHash( 'WRONG-TRANSACTION-HASH' ));

// On- (Error || Warning)
{
  "code": 400,
  "msg": "Not valid Transaction Hash",
  "data": {}
}

{
  "code": 500,
  "msg": "No such mempool or blockchain transaction. Use gettransaction for wallet transactions",
  "data": {}
}

```

-----

#### Method: getBlockByID

```javascript
const res = await TCG.getBlockByID( 575217 );

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": {
    ...
  }
}

// On- (Error || Warning)
{
  "code": <code>,
  "msg": "<description>",
  "data": {}
}
```

-----

#### Method: estimateSmartFee

```
Get the best transaction fee for the moment.
Within next blocks: Min 2, Max Inf.

The lower <withInNextBlocks>, the heigher <tx-fee> will be

```

```javascript
const res = await = TCG.estimateSmartFee( <With in next blocks> );

// On-Success
{
"code": 200,
"msg": "OK",
"data": {
  "perKiloByte": 0.00081461,
  "perByte": 7.95518e-7,
  "avgTxBytes": 195,
  "avgTxCoastBtc": 0.00015513,
  "withInNextBlocks": 2
}

// On- (Error || Warning)
{
  "code": <code>,
  "msg": "<description>",
  "data": {}
}
```

-----

#### Method: getKeyPair

```
Create new (random) CryptoPair => Public && Private key

WARNING: 
  You must store it in your own database or you will lose all your Crypto 

```

```javascript

const KeyPair = await TCG.getKeyPair();

// On-Success
{
  "code": 200,
  "msg": "OK",
  "data": {
    "symbol": "BTC",
    "sec_key": "L1xx81HHJhNFJdmU5soiL1SbYzmZ6Anu8GdtiUE7GDifzViy6rwj",
    "pub_key": "1MD1LWPp3uj53ithDs9ygMi2tFkB3vt27V",
    "encrypted": false
  }
}

// On- (Error || Warning)
{
  "code": <code>,
  "msg": "<description>",
  "data": {}
}
```
