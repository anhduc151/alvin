import { CryptoCurrencyModel } from './CryptoCurrencyModel';

export type AddressCrypto = `0x${string}`;

export type PaymentResponseModel = {
  crypto: CryptoCurrencyModel;
  hash: AddressCrypto;
};

export enum OrderStatus {
  Processing = 'processing',
  Success = 'success',
  Cancel = 'cancel',
  Failed = 'failed'
}
