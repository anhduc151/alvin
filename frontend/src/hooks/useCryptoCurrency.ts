import { fetchGet } from 'helpers/helpers';
import { CryptoCurrencyModel } from 'models/CryptoCurrencyModel';

export function useCryptoCurrency() {
  const getCrypto = async () => {
    const response = await fetchGet(
      `v1/api/admin/crypto-currency?page=1&page_size=100`
    );

    if (!response?.ok) {
      console.log('ERROR: ', response);
      throw new Error('Failed to purchase plan');
    }

    return response.json() as Promise<{ results: CryptoCurrencyModel[] }>;
  };

  return {
    getCrypto
  };
}
