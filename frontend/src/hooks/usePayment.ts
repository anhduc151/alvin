import { erc20Abi } from 'viem';
import {
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';

import { useCryptoCurrency } from './useCryptoCurrency';

export function usePayment() {
  const { getCrypto } = useCryptoCurrency();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const account = useAccount();
  ``;
  const { data: hash, error, writeContractAsync } = useWriteContract();

  const payment = async (price: number) => {
    const resCrypto = await getCrypto();
    const cryptoCurrencies = resCrypto.results;
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
      return { crypto: cryptoCurrencies[0], data };
    } else {
      connect({ connector: connectors[0], chainId: bscTestnet.id });
    }
  };

  // const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
  //   hash
  // });

  const balance = () => {
    const result = useReadContract({
      chainId: bscTestnet.id,
      abi: erc20Abi,
      functionName: 'balanceOf',
      address: '0x6d68b9Ee03410FFc5c8aB1a4Ae1EaEedbD1A5bcB',
      args: ['0x80a2C8Ec9894DdD8f52eEf26eb6d11d46D3fC9A7']
    });
    return result;
  };

  return {
    payment,
    // balance,
    hash,
    error,
    // isConfirming,
    // isSuccess
  };
}
