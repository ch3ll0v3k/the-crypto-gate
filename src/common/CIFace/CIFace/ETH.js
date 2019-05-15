// const EUnil = require('ethereumjs-util');
// const Web3  = require('web3');
// const ETHTx = require('ethereumjs-tx');
// const axios = require('axios');

const INFURA_API_KEY = '';
const ETHERSCAN_API_KEY = '';

// module.exports.getWeb3 = getWeb3;
function getWeb3(){
  return new Web3( new Web3.providers.HttpProvider('https://mainnet.infura.io/'+INFURA_API_KEY) );
}

function satoshiToETH( inp ){
  return +((+inp)/10e17).toFixed(18);
}

function ETHToSatoshi( inp ){
  return +((+inp)*10e17).toFixed(18);
}

async function getUnconfirmedTXs( address ){

  return new Promise( async(resolve, reject)=>{

    try{

      resolve({code: 200, msg: 'OK', data: {
        total: 0,
        address,
      }});

    }catch(e){
      resolve({code:500, msg: e.message});
      console.error( e );
    }
  });

}

async function send( sec_key, dest_address, amount, options=false ){
  return new Promise( async(resolve, reject)=>{
    try{
      const txHash = '<tx-hash>';
      resolve({ code: 200, msg: 'OK', data: {hash: txHash, address: dest_address} });
    }catch(e){
      resolve({code:500, msg: e.message});
      console.error( e );
    }
  });
}

async function getBalance( dest_address ){
  return new Promise( async(resolve, reject)=>{
    try{
      const ETH_balance = 1.1;
      resolve({code:200, msg: 'OK', data: {balance: ETH_balance, address: dest_address}});
    }catch(e){
      resolve({code:500, msg: e.message});
      console.error( e );
    }
  });
}

async function pubKeyFromSecKey( sec_key ){
  try{
    const address = '0x'+EUnil.privateToAddress( '0x'+sec_key ).toString('hex');
    return {code: 200, msg:'OK', data:{ address }};
  }catch(e){
    return {code: 500, msg: e.message};
  }
}

module.exports.send = send;
module.exports.getBalance = getBalance;
module.exports.pubKeyFromSecKey = pubKeyFromSecKey;
module.exports.getUnconfirmedTXs = getUnconfirmedTXs;


