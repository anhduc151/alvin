import { erc20Abi } from 'viem';
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';

import { useCryptoCurrency } from './useCryptoCurrency';

export function usePayment() {
  const { cryptoCurrencies } = useCryptoCurrency();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const account = useAccount();
  const { data: hash, error, isPending, writeContractAsync } = useWriteContract();

  const payment = async (price: number) => {
    if (!cryptoCurrencies) return;
    if (isConnected) {
      console.log('account', account);
      console.log('cryptoCurrencies: ', cryptoCurrencies);
      const data = await writeContractAsync({
        chainId: cryptoCurrencies[0].chain_id ?? bscTestnet.id,
        address: cryptoCurrencies[0].contract_address, // change to receipient address
        functionName: 'transfer',
        abi: erc20Abi,
        args: [
          import.meta.env.VITE_OWNER_ADDRESS_WALLET,
          BigInt((price / 10000) * 10 ** cryptoCurrencies[0].decimal)
        ]
      });
      console.log('writeContract', data);
      return {crypto: cryptoCurrencies[0], data};
    } else {
      connect({ connector: connectors[0], chainId: mainnet.id });
    }
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  });

  const getHash = async (hash: string) => {
    return hash;
  };

  return {
    payment,
    getHash,
    hash,
    error,
    isPending,
    isConfirming,
    isSuccess
  };
}
