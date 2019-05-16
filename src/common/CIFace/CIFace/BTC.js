const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');
// const TransactionFees = [
//   /* 0 */ '0', 
//   /* 1 */ '0',
//   /* 2 */ 'high', 
//   /* 3 */ '0',
//   /* 4 */ 'normal',
//   /* 5 */ '0',
//   /* 6 */ 'low',
// ]

// function getTransactionFeesWithInBlocks( type='normal' ){
//   return Math.abs(TransactionFees.indexOf(type.trim().toLowerCase())) || 4;
// }
// module.exports.getTransactionFeesWithInBlocks = getTransactionFeesWithInBlocks;

function BTCToSatoshi( btc ){
  return parseInt( (+btc) * 10e7 );
}


module.exports.createRawTransaction = async function( TCG, sec_key, dest_bundle, options=false ){

  return new Promise( async(resolve, reject)=>{

    try{

      // console.json({sec_key, dest_bundle, options});

      // {
      //   "sec_key": "KyJnC8ToQ6UD2 ......",
      //   "dest_bundle": [
      //     {
      //       "address": "1GPwAmZFSZ3vFy1mfJqpDcNqrmXZjMxYV",
      //       "amount": 0.034
      //     }
      //   ],
      //   "options": {
      //     "allowDust": false,
      //     "feeType": 3,
      //     "tryToFitTxFee": true,
      //     "withInNextBlocks": 3,
      //     "maxTxfee": 0.00019092,
      //     "perByte": 7.95518e-7
      //   }
      // }

      // User Options
      const MAX_FEE     = BTCToSatoshi( options.maxTxfee );
      const ALLOW_DUST  = ( options.allowDust || false );

      // console.json({MAX_FEE});
      // return;

      const keyPair           = bitcoin.ECPair.fromWIF( sec_key );
      const src_address       = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;

      let amount = 0;
      for( let dest of dest_bundle ){
        amount += parseFloat( dest.amount );
      }

      if( (isNaN(amount) || amount < 0.00001) && !ALLOW_DUST ){
        resolve({code: 500, msg: 'amount is to small : ['+amount+'], use "allowDust: true" in options to allow small amount transactions' })
        return;
      }

      amount = BTCToSatoshi( amount );
      const res = await TCG.getAddressUnspent( src_address );
      // console.json({addressUnspent: res.data});

      if( res.code !== 200 ){
        resolve(res);
        return;          
      }

      if( (+res.data.length) <= 0 ){
        resolve({code: 417, msg: 'Address has insufficient balance' })
        return;          
      }

      let txb             = new bitcoin.TransactionBuilder();
      let send_total_out  = amount + MAX_FEE; 
      let total_send_out_value = 0;

      let input_txs_used = 0;
      for ( let UTXO of res.data ) {
        total_send_out_value += (+UTXO.value);
        txb.addInput( UTXO.tx_hash, UTXO.tx_pos );

        input_txs_used++;
        if( total_send_out_value >= send_total_out ){
          // available amount is >= required amount == OK
          break;
        }

      }

      // console.warn({
      //   input_txs_used, 
      //   total_send_out_value, 
      //   send_total_out,
      //   amount,
      // });

      let fit = true;

      if( total_send_out_value < send_total_out ){
        // console.warn({
        //   'total_send_out_value < send_total_out': true,
        //   total_send_out_value,
        //   send_total_out,
        // });

        if( options.tryToFitTxFee && dest_bundle.length == 1 ){
          amount = total_send_out_value - MAX_FEE;
          fit = false;
        }else{
          resolve({code: 417, msg:'Insufficient balance'});
          return;
        }
      } 

      // console.warn({
      //   amount,
      //   MAX_FEE,
      //   total: (amount +MAX_FEE),
      // });

      // --------------------------------------------
      const send_back_out = total_send_out_value -amount -MAX_FEE;
      // console.info({send_back_out});

      // 1-to-1 or 1-to-many
      for( let dest of dest_bundle ){
        if( !fit ){
          dest.amount = BTCToSatoshi(dest.amount) -MAX_FEE;
        }

        // console.info({add: dest.address, amount: dest.amount });
        txb.addOutput( dest.address, dest.amount );
      }

      // --------------------------------------------
      // if left over send it back 
      if( send_back_out > 0 ){ 
        // console.info({send_back_out: true, amount: send_back_out})
        txb.addOutput( src_address, send_back_out );
      }

      // Sign all Inputs
      for (let i=0; i< input_txs_used; i++) {
        txb.sign( i, keyPair);    
      }

      resolve({
        code:200, 
        msg:'Transaction is ready to be broadcasted',
        data:{
          raw_tx: txb.build().toHex(),
        }
      });

      // const pushRes = await TCG.pushRawTransaction( txb.build().toHex() );
      // resolve( pushRes );

    }catch(e){
      console.error(e);
      resolve({code: 500, msg: e.message});
    }

  });
}

