import api from "./api";
import TokenService from "./token.services";

const login = (username, password) => {
  return api
    .post("/connexion", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
    

};
const logout = () => {
  TokenService.removeUser();
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
