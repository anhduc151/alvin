import { AddressCrypto, OrderStatus } from './CommonModels';
import { CryptoCurrencyModel } from './CryptoCurrencyModel';

type UserPlanModel = {
  id: string;
  name: string;
  active: boolean;
  can_register: boolean;
  description?: string;
  num_word?: number;
  num_word_bonus?: number;
  benefit?: object;
  used_in?: number;
  price?: number;
  price_discount_percent?: number;
  created_at: string;
  updated_at: string;
  created_by_id?: string;
  updated_by_id?: string;
};

type PlanOrderModel = {
  id: string;
  paid_at?: string;
  status?: OrderStatus;
  volume?: number;
  current_price?: number;
  num_crypto_currency?: number;
  transaction_hash?: AddressCrypto;
  plan_id?: string;
  crypto_currency_id?: string;
  crypto_currency: CryptoCurrencyModel;
  plan: UserPlanModel;
  created_at?: string;
};

type PlanOrderPaymentBodyModel = {
  num_crypto_currency: number;
  crypto_currency_id: string;
  transaction_hash: AddressCrypto;
  volume: number;
};

export type { PlanOrderModel, PlanOrderPaymentBodyModel, UserPlanModel };

