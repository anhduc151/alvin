import { SystemModel } from './SystemModel';

export type CryptoCurrencyModel = SystemModel & {
  id: string;
  name: string;
  description: string;
  active: boolean;
  symbol: string;
  contract_address: `0x${string}`;
  decimal: number;
  chain: string;
  chain_id: number;
};
