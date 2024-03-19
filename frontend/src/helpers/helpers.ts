import { bsc, bscTestnet, mainnet } from 'viem/chains';

const getTokenGG = () => {
  const tokenGG = localStorage.getItem('token_gg');
  if (!tokenGG) {
    console.error('No Google token found.');
    return;
  }
  return tokenGG;
};

const fetchGet = (url: string) => {
  const tokenGG = getTokenGG();
  if (tokenGG) {
    return fetch(`${import.meta.env.VITE_DEVSERVER_URL}/${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenGG}`
      }
    });
  }
};

const fetchPost = (url: string, body?: object) => {
  const tokenGG = getTokenGG();
  if (tokenGG) {
    return fetch(`${import.meta.env.VITE_DEVSERVER_URL}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenGG}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }
};

const getLinkScan = (chainId: number) => {
  if (chainId === mainnet.id) return 'https://etherscan.io/tx';
  if (chainId === bsc.id) return 'https://bscscan.com/tx';
  if (chainId === bscTestnet.id) return 'https://testnet.bscscan.com/tx';
};

export { fetchGet, fetchPost, getLinkScan, getTokenGG };

