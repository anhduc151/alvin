import { AddressCrypto, OrderStatus } from './CommonModels';
import { CryptoCurrencyModel } from './CryptoCurrencyModel';

type TokenOrderModel = {
  id: string;
  status?: OrderStatus;
  paid_at?: string;
  created_at?: string;
  word?: number;
  price?: number;
  num_crypto_currency?: number;
  transaction_hash?: AddressCrypto;
  crypto_currency_id?: string;
  crypto_currency?: CryptoCurrencyModel;
};

type TokenOrderPaymentBodyModel = {
  num_crypto_currency: number;
  crypto_currency_id: string;
  transaction_hash: AddressCrypto;
};

export type { TokenOrderModel, TokenOrderPaymentBodyModel };

