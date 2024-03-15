import { AddressCrypto } from './CommonModels';

export type CryptoCurrencyModel = {
  id: string;
  name?: string;
  description?: string;
  symbol?: string;
  contract_address?: AddressCrypto;
  decimal?: number;
  chain?: number;
};
