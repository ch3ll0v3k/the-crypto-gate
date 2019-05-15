
const TheCryptoGate = require('the-crypto-gate');

const TCG = new TheCryptoGate({
  apiKey: '1vO34IlwcMzZdpkWLe5upn9KwhZvYAymQ0oanE4o',
});

const balanseRes = await TCG.getAddressBalance('15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb');

{
   "code": 200,
   "msg": "OK",
   "data": {
     "balance": 0.00137764,
     "confirmed": 0.00137764,
     "unconfirmed": 0
   }
 }













const Keys = {
  alice: {
    sec_key :'KyJnC8ToQ6UD21uJZGm8feyavs2vavXnaa4E91xuX5RxLDUwf7Sg',
    pub_key :'15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb',
  },
  bob: {
    sec_key :'Kx7mP5jit8c1hAeX59hMPXNHsQqnwa5orC9zhpiUo8B4vng4mUcz',
    pub_key :'1Kf5Jmq2s5rZ6R1iVs4eQ59zPbtF2qas6B',

  }
};

(async ()=>{

  // console.json( await TCG.pushRawTransaction('02000000016d97be4cf0fafccb85b37b618a38e4a9d308eed7e87251d77aaad480050b1326010000006b483045022100ea1d4b1b9254ed06a54edf48800fd5d93bf72c243465bd5db091355432d86bb902205eb91ebaf053bb828e4f245de449b229018b4b10ea0d9b2604af0edb285672290121027c3d040790e52bd133300ee3d3939972082f0aaedbfed9e78d7da5832691d1e7ffffffff0210270000000000001976a914cca5aa5d096a864af0e343516b55925b634366dc88ac241a0200000000001976a9142ea151d5ba02408cfeec9109590d19322a5e1efa88ac00000000'), true, 2, false);
  // console.json( await TCG.getTransactionByHash( 'df7a1caeffa7340613da5d01929b24a7de66b499874f1f23a072bebd3935c81b' ), true, 2, false);

  // console.json( await TCG.getTransactionByHash( 'WRONG-TRANSACTION-HASH' ), true, 2, false);


  // console.json( await TCG.getAddressUnspent('WRONG-ADDRESS') , true, 2, false);
  console.json( await TCG.getAddressUnspent('15FZLWefShJjwAuDcGgMAhUXXHMgXPyjGb') , true, 2, false);

  // console.json({
  //   balance: {
  //     alice: await TCG.getAddressBalance( Keys.alice.pub_key ),
  //     bob: await TCG.getAddressBalance( Keys.bob.pub_key ),
  //   },
  //   // unspent:{
  //   //   _1GP: (await TCG.getAddressUnspent( '1GPwAmZFSZ3vFy1mfJqpDcNqrmXZjMxYV' )).data,
  //   //   alice: (await TCG.getAddressUnspent( Keys.alice.pub_key )).data,
  //   //   bob: (await TCG.getAddressUnspent( Keys.bob.pub_key )).data,
  //   // },
  //   common:{
  //     // pushRawTransaction: await TCG.pushRawTransaction('02000000016d97be4cf0fafccb85b37b618a38e4a9d308eed7e87251d77aaad480050b1326010000006b483045022100ea1d4b1b9254ed06a54edf48800fd5d93bf72c243465bd5db091355432d86bb902205eb91ebaf053bb828e4f245de449b229018b4b10ea0d9b2604af0edb285672290121027c3d040790e52bd133300ee3d3939972082f0aaedbfed9e78d7da5832691d1e7ffffffff0210270000000000001976a914cca5aa5d096a864af0e343516b55925b634366dc88ac241a0200000000001976a9142ea151d5ba02408cfeec9109590d19322a5e1efa88ac00000000'),
  //     // transactionByHash: await TCG.getTransactionByHash( '40613da5d01929b24a7de66b499874f1f23a072bebd3935c81bdf7a1caeffa73' ),
  //     // getBlockByID: await TCG.getBlockByID( 575217 ),
  //   },
  // }, true, 2, false);

  // const balance = await TCG.getAddressBalance( Keys.alice.pub_key );
  // console.json({balance});

  // const r = await TCG.getAddressBalance( '<address>' );
  // const r = await TCG.getAddressUnspent( '<address>' );
  // const r = await TCG.pushRawTransaction( '<raw_tx>' );
  // const r = await TCG.getTransactionByHash( '<tx_hash>' );
  // const r = await TCG.getBlockByID( '<block_id>' );

})();




















