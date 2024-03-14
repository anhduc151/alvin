import { CryptoCurrencyModel } from './CryptoCurrencyModel';
import { PlanModel } from './PlanModel';
import { AddressCrypto, SystemModel } from './SystemModel';

export type OrderModel = SystemModel & {
  id: string;
  paid_at: string;
  status: OrderStatus;
  current_price: number;
  num_crypto_currency: string;
  transaction_hash: AddressCrypto;
  plan_id: string;
  crypto_currency_id: string;
  crypto_currency: CryptoCurrencyModel;
  plan: PlanModel;
};

export enum OrderStatus {
  Processing = 'processing',
  Success = 'success',
  Cancel = 'cancel'
}
