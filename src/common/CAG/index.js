// Crypto-Addresses-Generator

const bitcoin         = require('bitcoinjs-lib');
const keythereum      = require('keythereum');
const litecore        = require('litecore-lib');
const wif             = require('wif');
const crypto          = require('crypto');

function hex2wif( hex ){
  const sec_key = typeof hex === 'string' ? new Buffer( hex , 'hex') : hex;
  return wif.encode(128, sec_key, true);
} 

module.exports.hex2wif = hex2wif;

// --------------------------------------------------------------------
function getBTC(){
  const keyPair = bitcoin.ECPair.makeRandom();
  const Obj = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return {
    code : 200,
    msg : 'OK',
    data:{
      symbol : 'BTC',
      sec_key : keyPair.toWIF(),
      pub_key : Obj.address,
      encrypted: false,
    }
  };
}

// --------------------------------------------------------------------
function getETH(){

  // Generate with random seed, ADDRESS/PK are non-recoverable
  const tmpSeedBuffer = crypto.randomBytes(64);
  const dk            = keythereum.create();
  const keyObject     = keythereum.dump( tmpSeedBuffer.toString('hex'), dk.privateKey, dk.salt, dk.iv );
  const sec_key       = keythereum.recover( tmpSeedBuffer.toString('hex'), keyObject).toString('hex');
  const pub_key       = keyObject.address;

  return {
    code : 200,
    msg : 'OK',
    data:{
      symbol : 'ETH',
      sec_key : sec_key,
      pub_key : '0x'+pub_key,            
      encrypted: false,
    }
  };
}

// --------------------------------------------------------------------
// function getXEM(){
//   const rBytes  = nem.crypto.nacl.randomBytes( 32 );
//   const sec_key = nem.utils.convert.ua2hex( rBytes );
//   const keyPair = nem.crypto.keyPair.create( sec_key );
//   const pub_key = keyPair.publicKey.toString();
//   const address = nem.model.address.toAddress( pub_key, 104 ); // const MAINNET = 104;   // N [ ADDRESS ]

//   return {
//     code : 200,
//     msg : 'OK',
//     data:{
//       symbol : 'XEM',
//       sec_key : sec_key,
//       pub_key : address,
//       encrypted: false,
//     }
//   };
// }

// --------------------------------------------------------------------
function getLTC(){

  const sec_key  = new litecore.PrivateKey();
  const pub_key  = sec_key.toAddress();

  return {
    code : 200,
    msg : 'OK',
    data:{
      symbol : 'BTC',
      sec_key : sec_key.toString(),
      pub_key : pub_key.toString(),
      encrypted: false,
    }
  };

}

// --------------------------------------------------------------------
module.exports.getKeyPair = async function( type, encrypt=true ){

  return new Promise( async(resolve, reject)=>{
    try{

      let symbol = type.toUpperCase().trim();
      let keyObj = null;

      switch( symbol ){
        case 'BTC': keyObj = getBTC(); break;
        case 'ETH': keyObj = getETH(); break;
        case 'LTC': keyObj = getLTC(); break;
        // case 'XEM': keyObj = getXEM(); break;
        default: keyObj = {
          code : 404,
          msg : 'Symbol Not found',
          data:{
            symbol : 'n/a',
            sec_key : 'n/a',
            pub_key : 'n/a',
            encrypted: false,
          }
        };
      }

      keyObj.clean = ()=>{
        return {
          symbol: keyObj.data.symbol,
          sec_key: keyObj.data.sec_key,
          pub_key: keyObj.data.pub_key,
        }
      }

      resolve( keyObj );

      // if( encrypt ){
      //   const RSARes = RSA.encrypt( keyObj.data.sec_key );
      //   if( RSARes.code === 200 ){
      //     keyObj.data.sec_key = RSARes.data;
      //     keyObj.data.encrypted = true;
      //   }
      // }

    }catch(e){
      resolve({code: 500, msg: e.message});
    }
  })

}

