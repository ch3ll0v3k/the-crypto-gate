const axios = require('axios');
const http = require('http');
const https = require('https');

const conf = require('./configs/main');

module.exports = AXI = class{

  constructor( {apiKey} ){
    this.base = conf.base;
    this.apiKey = apiKey;
  }

  async request( path, params={}, headers={} ){

    const self = this;

    return new Promise( async(resolve, reject)=>{

      try{

        params['x-api-key'] = self.apiKey;
        headers['x-api-key'] = self.apiKey;

        const res = await axios({
          url: (self.base + path),
          method: 'POST',
          headers: headers,
          data: params,
          responseType: 'json',
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        if( (+res.status) !== 200 ){
          resolve({code: (+res.status), msg: res.statusText, data: res.data});
          return;
        }

        // resolve({code: 200, msg: 'OK', data: res.data});
        resolve(res.data); // res.data == {code:0, ...};

      }catch(e){
        console.warn(' #post: ['+path+'] '+e.message);
        resolve({code: 500, msg: e.message, data:null});
      }

    });

  }

}

