const getFetch = (url: string, method: string, body?: object, contentType?: string) => {
  const tokenGG = localStorage.getItem('token_gg');
  if (tokenGG) {
    return fetch(`${import.meta.env.VITE_DEVSERVER_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${tokenGG}`,
        "Content-Type": contentType ?? "application/json",
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }
};

export { getFetch };

