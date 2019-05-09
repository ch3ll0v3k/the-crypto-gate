const AXI = require('./axios.wrapper.js');
// const logger = require('mii-logger.js');

module.exports = TheCryptoGate = class {

  constructor( params ){
    this.apiKey = params.apiKey;
    this.coin = 'btc'; // params.coin 
    this.AXI = new AXI( params );
  }

  async getAddressBalance( address ){
    return this.AXI.request( `/${this.coin}/get-address-balance/`, {address} );
  }

  async getAddressUnspent( address ){
    return this.AXI.request( `/${this.coin}/get-address-unspent/`, {address} );
  }

  async pushRawTransaction( raw_tx ){
    return this.AXI.request( `/${this.coin}/push-raw-transaction/`, {raw_tx} );
  }

  async getTransactionByHash( tx_hash ){
    return this.AXI.request( `/${this.coin}/get-transaction-by-hash/`, {tx_hash} );
  }

  async getBlockByID( block_id ){
    return this.AXI.request( `/${this.coin}/get-block-by-id/`, {block_id} );
  }

}
