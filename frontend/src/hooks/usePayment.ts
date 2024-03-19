import { erc20Abi } from 'viem';
import {
  useAccount,
  useChainId,
  useConnect,
  useReadContract,
  useSwitchChain,
  useWriteContract
} from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';

import { useCryptoCurrency } from './useCryptoCurrency';

export function usePayment() {
  const { getCrypto } = useCryptoCurrency();
  const currentChainId = useChainId();
  const { connectAsync, connectors } = useConnect();
  const { isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { error, writeContractAsync } = useWriteContract();

const checkConnect = async (chainId?: number) => {
  if (!isConnected) {
    const connected = await connectAsync({
      connector: connectors[0],
      chainId: chainId ?? mainnet.id
    });
    return connected !== undefined
  }
  return true;
}

  const checkChain = async (chainId?: number) => {
    let isCorrectChain = true;
    if (currentChainId !== chainId) {
      const { id } = await switchChainAsync({
        chainId: chainId ?? mainnet.id
      });
      isCorrectChain = id === (chainId ?? mainnet.id);
    }
    if (!isCorrectChain) {
      console.log('ERROR: chain is not correct!');
    }
    return isCorrectChain;
  };

  const paymentCrypto = async (price: number) => {
    if (price <= 0) return;
    const { results: tokens } = await getCrypto();
    if (!tokens || tokens.length === 0) return;
    const isConnect = await checkConnect(tokens[0].chain)
    if (!isConnect) return;
    const isCorrectChain = await checkChain(tokens[0].chain); //TODO: getBalance before get crypto
    if (!isCorrectChain) return;
    const hash = await writeContractAsync({
      address: tokens[0].contract_address ?? '0x',
      functionName: 'transfer',
      abi: erc20Abi,
      args: [
        import.meta.env.VITE_OWNER_ADDRESS_WALLET,
        BigInt((price / 10000) * 10 ** (tokens[0].decimal ?? 0)) //TODO: remove exchange rate test
      ]
    });
    return { crypto: tokens[0], hash };
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
    paymentCrypto,
    balance,
    error
    // isConfirming,
    // isSuccess
  };
}
