// const logger = require('mii-logger.js');

const AXI = require('./axios.wrapper');
const CAG = require('./common/CAG');
const CIFace = require('./common/CIFace');

module.exports = TheCryptoGate = class {

  constructor( params ){
    this.apiKey = (''+params.apiKey).trim();
    this.coin = ( ''+( params.coin || 'btc' ) ).trim().toLowerCase(); 
    this.AXI = new AXI( params );
  }

  async getKeyPair(){
    return CAG.getKeyPair( this.coin );
  }

  async createRawTransaction( sec_key, dest_bundle, options=false ){

    options.withInNextBlocks = (+options.feeType) || 3;
    options.maxTxfee = 0.00012500; // sat.
    options.perByte = 7.95518e-7; // sat.

    const smartFeeRes = await this.estimateSmartFee( options.withInNextBlocks );
    // {
    //   "smartFeeRes": {
    //     "code": 200,
    //     "msg": "OK",
    //     "data": {
    //       "perKiloByte": 0.00081461,
    //       "perByte": 7.95518e-7,
    //       "avgTxBytes": 195,
    //       "avgTxCoastBtc": 0.00015513,
    //       "withInNextBlocks": 12
    //     }
    //   }
    // }

    /*
      1 to 2 => Size: (avg) 225 bytes 
      1 to 1 => Size: (avg) 190 bytes 
      3 to 1 => Size: (avg) 450-550 bytes 
      2 to 2 => Size: (avg) 350-450 bytes 
    */


    if( smartFeeRes.code === 200 ){
      options.perByte = (+smartFeeRes.data.perByte);
    }

    // to ba sefe => * 50 bytes, each next output
    // 190 bytes basic 1 to 1 tx
    options.maxTxfee = +((options.perByte) * ( 190 + (dest_bundle.length * 50) )).toFixed(8);

    // return options;
    return CIFace.createRawTransaction( this, this.coin, sec_key, dest_bundle, options );

  }

  // net.chain
  async estimateSmartFee( blocks=2 ){
    return this.AXI.request( `/${this.coin}/estimate-smart-fee/`, {blocks} );
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
