
const BTC  = require('./CIFace/BTC.js');
// const ETH  = require('./CIFace/ETH.js');

// async function pubKeyFromSecKey( sec_key ){
//   try{

//     const keyPair = bitcoin.ECPair.fromWIF( sec_key );
//     const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
//     return {code: 200, msg:'OK', data:{ address }};

//   }catch(e){
//     console.error(e);
//     return {code: 500, msg: e.message};
//   }
// }

// module.exports.pubKeyFromSecKey = pubKeyFromSecKey;

module.exports.createRawTransaction = async function( TCG, symbol, sec_key, dest_bundle, options=false ){

  return new Promise( async( resolve, reject )=>{

    try{

      // amount = parseFloat(amount);
      // if( isNaN(amount) || amount <= 0 ){
      //   resolve({code: 417, msg:'Amount must be positive value'});
      //   return;
      // }

      switch( (''+symbol).toUpperCase().trim() ){

        case 'BTC': 
          resolve( await BTC.createRawTransaction( TCG, sec_key, dest_bundle, options ) );
          return;
        // case 'ETH': 
        //   resolve( await ETH.createRawTransaction( TCG, sec_key, dest_bundle, options ) );
        //   return;

        default:
          resolve({code: 404, msg:'Provided symbol is not supported'});
          return;
      }

    }catch( e ){
      console.error(' #CIFace::send: '+e.message );
      resolve({ code: 500, msg: e.message });
      return;
    }

  });

}


module.exports.pubKeyFromSecKey = async function( symbol, sec_key ){

  return new Promise( async( resolve, reject )=>{

    try{

      switch( (''+symbol).toUpperCase().trim() ){
        case 'BTC': 
          resolve( BTC.pubKeyFromSecKey( sec_key ) );
          return;
        // case 'ETH': 
        //   resolve( ETH.pubKeyFromSecKey( sec_key ) );
        //   return;
        default:
          resolve({code: 404, msg:'Provided symbol is not supported'});
          return;
      }

    }catch( e ){
      console.error(' #CIFace::pubKeyFromSecKey: '+e.message );
      resolve({ code: 500, msg: e.message });
    }

  });

}
