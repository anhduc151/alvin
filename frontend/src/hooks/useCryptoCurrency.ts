import { getFetch } from 'helpers/helpers';
import { CryptoCurrencyModel } from 'models/CryptoCurrencyModel';
import useSWR from 'swr';

export function useCryptoCurrency() {
  const fetcher = async (url: string) => {
    
    const response  = await getFetch(url, "GET");
   
    if (!response ?.ok) {
      throw new Error(`ERROR: ${response ?.statusText}`);
    }
    return response.json() as Promise<{results: CryptoCurrencyModel[]}>
  };

  const { data, error, isLoading } = useSWR(
    `v1/api/admin/crypto-currency?page=1&page_size=100`,
    fetcher
  );

  return {
    cryptoCurrencies: data?.results,
    error,
    isLoading
  };
}
