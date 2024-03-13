import { AddressCrypto, SystemModel } from './SystemModel';

export type CryptoCurrencyModel = SystemModel & {
  id: string;
  name: string;
  description: string;
  active: boolean;
  symbol: string;
  contract_address: AddressCrypto;
  decimal: number;
  chain: string;
  chain_id: number;
};
