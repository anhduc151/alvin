import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, bsc, sepolia, bscTestnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http()
  },
});
