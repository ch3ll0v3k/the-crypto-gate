const CIFace = require('./');

const sleep = async( mSec )=>{
  let timeout_t = null;
  return new Promise( async(resolve, reject)=>{
    timeout_t = setTimeout(()=>{
      clearTimeout(timeout_t);
      resolve();
    }, mSec);
  });
}

(async ()=>{

  return;

  const Keys = {
    alice: {
      sec_key :'KyJnC8ToQ6UD21uJZGm8feyavs2vavXnaa4E91xuX5RxLDUwf7Sg',
      pub_key :'15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb',
    },
    bob: {
      sec_key :'Kx7mP5jit8c1hAeX59hMPXNHsQqnwa5orC9zhpiUo8B4vng4mUcz',
      pub_key :'1Kf5Jmq2s5rZ6R1iVs4eQ59zPbtF2qas6B',

    },
    ch3ll0v3k:{
      pub_key: '1GPwAmZFSZ3vFy1mfJqpDcNqrmXZjMxYV',
    }
  }

  // console.json({
  //   alice: await CIFace.CIFace.getBalance('BTC', Keys.alice.pub_key),
  //   bob: await CIFace.CIFace.getBalance('BTC', Keys.bob.pub_key),
  // });

  // const aliceBalance = await CIFace.CIFace.getBalance('BTC', Keys.alice.pub_key);
  // if( aliceBalance.code !== 200 ){
  //   console.error('error: '+aliceBalance.msg);
  //   return;
  // }

  // const bobBalance = await CIFace.CIFace.getBalance('BTC', Keys.bob.pub_key);
  // if( bobBalance.code !== 200 ){
  //   console.error('error: '+bobBalance.msg);
  //   return;
  // }

  // const sendRes = await CIFace.CIFace.send('BTC', Keys.bob.sec_key, Keys.ch3ll0v3k.pub_key, bobBalance.data.balance);
  // console.json({sendRes});

  const ch3ll0v3kBalance = await CIFace.CIFace.getBalance('BTC', Keys.ch3ll0v3k.pub_key);
  console.json({ch3ll0v3kBalance});


  // const KeyPair = await CIFace.CIFace.generateKeyPair('BTC', false);
  // console.json({KeyPair});
  // return;

  // const unconfirmedTXs = await CIFace.CIFace.getUnconfirmedTXs('BTC', pub_key);
  // console.json({unconfirmedTXs});

  // const balance = await CIFace.CIFace.getBalance('BTC', Keys.alice.pub_key);
  // console.json({balance});

  // const sendRes = await CIFace.CIFace.send('BTC', Keys.alice.sec_key, Keys.bob.pub_key, 0.0001);
  // console.json({sendRes});

})();














