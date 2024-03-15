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

export { fetchGet, fetchPost, getTokenGG };

