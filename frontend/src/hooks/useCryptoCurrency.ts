import { getFetch } from 'helpers/helpers';
import { CryptoCurrencyModel } from 'models/CryptoCurrencyModel';

export function useCryptoCurrency() {
  const getCrypto = async () => {
    const response = await getFetch(
      `v1/api/admin/crypto-currency?page=1&page_size=100`,
      'GET'
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
