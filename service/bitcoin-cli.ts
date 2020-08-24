import { createRemote } from "https://deno.land/x/gentleRpc/rpcClient.ts";
import { Unspent } from '../models/index.ts';

export default class BitCoinCli {
    private prorityList = [
        {
            priority: 0,
            blocks: 2,
            time: 20
        },
        {
            priority: 1,
            blocks: 8,
            time: 80
        },
        {
            priority: 2,
            blocks: 24,
            time: 240
        },
        {
            priority: 3,
            blocks: 48,
            time: 480
        },
        {
            priority: 4,
            blocks: 144,
            time: 1440
        }
    ];

    createConnection(walletName?: string) {
        const uri = !!walletName ? 
            `http://127.0.0.1:8332/wallet/${walletName}` : 
            `http://127.0.0.1:8332/wallet/`;

        let Node = new URL(uri);
        Node.port = "8332";
        Node.username = "mainuser";
        Node.password = "clwn934893rfb3r83bfwhkeb34f";
        return createRemote(Node);
    }

    async listAddresses(walletName?: string) {
        const remote = this.createConnection(walletName);
        return await remote.listreceivedbyaddress(0, true);
    }

    async createWallet(walletLabel: string) {
        const remote = this.createConnection();
        return await remote.createwallet(walletLabel);
    }

    async getnewaddress(addressLabel: string, walletName?: string) {
        const remote = this.createConnection(walletName);
        return await remote.getnewaddress(addressLabel);
    }

    async sendCoin(
        amount: number, 
        from: string[], 
        to: string,
        priority: number,
        walletName?: string
    ) {
        const remote = this.createConnection(walletName);
        const unspent: Unspent[] = await remote.listunspent(1, 99999999, from);
        const txids = this.sortTxToSpendFrom(unspent, amount);
        if (txids === null) return { 
            status: false, 
            reason: 'insufficient funds'
        };
        const rawTx = await remote.createrawtransaction(txids, {to: amount});
        const privateKeys = await this.getPrivateKeys(remote, from);
        const signedTx = await remote.signrawtransactionwithkeys(rawTx, privateKeys);
        const txFee = await this.calcTxFees(priority, remote);
        const txHash = await remote.sendrawtransaction(signedTx, txFee);
        return await remote.decoderawtransaction(txHash);
    }

    async getHelp() {
        const remote = this.createConnection();
        return await remote.help();
    }

    async calcTxFees(
        priority: number,
        remote: any
    ) {
        const prorityObj = this.prorityList
            .find(p => p.priority === priority) || 
        this.prorityList[this.prorityList.length - 1];
        
        const fee = await remote.estimatesmartfee(prorityObj.blocks);
        return fee.feerate;
    }

    sortTxToSpendFrom(unspents: Unspent[], amount: number) {
        const txids = [];
        let total = 0;
        unspents.sort((a, b) => b.amount - a.amount);
    
        for (let i = 0; i < unspents.length; i++) {
            total += unspents[i].amount;
            txids.push({ txid: unspents[i].txid, vout: 0 });
            if (total >= amount) return txids;
        }
        return null;
    }

    async getPrivateKeys(remote: any, addresses: string[]) {
        const arrPrivateKeys = [];
        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const privateKey = await remote.dumpprivkey(address);
            arrPrivateKeys.push(privateKey);  
        }
        return arrPrivateKeys;
    }
}
