import controllers from './service/bitcoin-cli.ts'

const controls = new controllers();

console.log(await controls.getnewaddress('emmanuel_address', 'patricia_wallet'))
console.log(
  await controls.getAddressInfo("bc1q7vs6y0vpkg90zfh7wefsqcxj0zcepc6yckfwxw", "patricia_wallet")
);

console.log(
    await controls.sendCoin(
        10,
        [
            "bc1qdadt7zszcw3exc7u2jxhnf503lh5pgsqk6xc9l",
            "bc1q7vs6y0vpkg90zfh7wefsqcxj0zcepc6yckfwxw"
        ], 
        'bc1qerlr9kk3sgfm8y88s28l0hyjkyq5x4r8fhhx80',
        0,
        'patricia_wallet'
    ),
);

console.log(
    await controls.sortTxToSpendFrom(
        [{
            "txid": "12b8e7ede4992f4d30f93idj3085746951d945e39f40becebd7c290af8c2e7ad",
            "vout": 1,
            "address": "mkrzDhhZtzQm8zgckSs4fMNrvtNJ66zaFe",
            "account": "micz",
            "scriptPubKey": "76a9143aa28e1740a6a5a2190975b6e7f1ad67aaec9a3988ac",
            "amount": 0.05000000,
            "confirmations": 94,
            "spendable": true
        }, {
            "txid": "8443bc63b65d569ff9ekwm37sy3b67b9c7c6f8f386c3cdf372b260961b64ec9fc",
            "vout": 1,
            "address": "mkrzDhhZtzQm8zgckSs4fMNrvtNJ66zaFe",
            "account": "micz",
            "scriptPubKey": "76a9143aa28e1740a6a5a2190975b6e7f1ad67aaec9a3988ac",
            "amount": 0.01000000,
            "confirmations": 93,
            "spendable": true
        }],
        0.025
    ),
);
