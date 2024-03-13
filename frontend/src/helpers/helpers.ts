const getFetch = (url: string, method: string, body?: object) => {
  const tokenGG = localStorage.getItem('token_gg');
  if (tokenGG) {
    return fetch(`${import.meta.env.VITE_DEVSERVER_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${tokenGG}`
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }
};

export { getFetch };

