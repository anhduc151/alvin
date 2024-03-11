import { abi } from 'configs/abi';
import { useState } from 'react';
import { erc20Abi } from 'viem';
import {
    useAccount,
    useConnect,
    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';

export const usePayment = () => {
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState();

  const payment = async (price: number) => {
    writeContract({
      chainId: sepolia.id,
      address: '0xd7a4d2C59c42016d5CF6771F5B03A351Cd2184b4', // change to receipient address
      functionName: 'transfer',
      abi: erc20Abi,
      args: [import.meta.env.VITE_OWNER_ADDRESS_WALLET, BigInt(price)]
    });
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
    error,
    isPending,
    isConfirming,
    isSuccess
  };
};
