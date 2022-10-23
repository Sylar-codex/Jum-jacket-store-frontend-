export const tokenConfig = (auth) => {
  const token = auth.token;
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
