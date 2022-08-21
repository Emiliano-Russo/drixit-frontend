const port = process.env.REACT_APP_PORT;
const domain = process.env.REACT_APP_DOMAIN;
const uri = domain + ":" + port;

export const config = {
  loginRoute: uri + "/api/v0/authenticate",
  userInfoRoute: uri + "/api/v0/users/me",
};
