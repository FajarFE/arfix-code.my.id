import axios from "axios";

const baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;
export const posts = axios.create({
    baseURL: `${baseURL}/api/posts`,
  });
  
  export const Category = axios.create({
    baseURL: `${baseURL}/api/categories`,
  });
  
  export const login = axios.create({
      baseURL: `${baseURL}/api/login`,
  });
  
  export const register = axios.create({
      baseURL: `${baseURL}/api/register`,
  });
  
  export const logout = axios.create({
      baseURL: `${baseURL}/api/logout`,
  });
  
  export const user = axios.create({
      baseURL: `${baseURL}/api/user`,
  });

  export const Headline = axios.create({
    baseURL: `${baseURL}/api/posts`,
    });

export default {Headline, posts, Category, login, register, logout,user };
