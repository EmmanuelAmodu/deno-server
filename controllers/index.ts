import BitcoinCli from "../service/bitcoin-cli.ts";

const bitcoinCli = new BitcoinCli();

export default {
    getAddressInfo: (
        { params, response }: {
            params: {
                wallet_label: string,
                address: string
            }; 
            response: any;
        },
    ) => {
        bitcoinCli
        .getAddressInfo(params.address, params.wallet_label)
        .then(info => {
            response.status = 200;
            response.body = info;
        }, error => {
            response.status = 500;
            response.body = { message: '' };
        }
        );
    },
}