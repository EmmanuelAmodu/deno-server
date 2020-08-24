interface Unspent {
  txid: string;
  vout: number;
  address: string;
  account: string;
  scriptPubKey: string;
  amount: number;
  confirmations: number;
  spendable: boolean;
}

interface AddressInfo {
  address: string;
  amount: number;
  confirmations: number;
  label: string;
  txids: string[];
}
