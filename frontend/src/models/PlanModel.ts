import { AddressCrypto, SystemModel } from './SystemModel';

export type PlanModel = SystemModel & {
  id: string;
  name: string;
  active: boolean;
  description: number;
  num_word: string;
  num_word_bonus: string;
  benefit: string;
  used_in: number;
  price: number;
  price_discount_percent: number;
};

export type PlanOrderPaymentBodyModel = {
  num_crypto_currency: number;
  crypto_currency_id: string;
  transaction_hash: AddressCrypto;
};
