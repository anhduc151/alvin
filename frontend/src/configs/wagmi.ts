import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';

export const configWagmi = createConfig({
  chains: [mainnet, bsc, sepolia, bscTestnet],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http()
  }
});
