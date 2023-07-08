import { createContext, useState, useEffect, useContext } from "react";
import { AUTH_STRING, AUTH_USER_STRING } from "../constants";
import { useRouter } from "next/router";
import axios from "../configs/axios.interceptor";
import { AUTH_ENDPOINT } from "../api/endpoint";
import { LoadingContext } from "./loading-context";
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(AUTH_STRING);
      if (token) {
        {
          await axios
            .get(AUTH_ENDPOINT.GET_ME, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              if (res) setUser(res?.data?.user);
            })
            .catch((error) => {});
        }
      }
    };

    initAuth();
  });

  const login = ({ params, redirectUrl }) => {
    setLoading(true);
    return axios
      .post(AUTH_ENDPOINT.LOGIN, params)
      .then((res) => {
        if (res && res?.data) {
          localStorage.setItem(AUTH_STRING, res?.data.accessToken);
          localStorage.setItem(
            AUTH_USER_STRING,
            JSON.stringify(res?.data.user)
          );
          return res?.data;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = ({ params, redirectUrl }) => {
    axios.post(AUTH_ENDPOINT.REGISTER).then((res) => {
      console.log(res);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_STRING);
    localStorage.removeItem(AUTH_STRING);
    router.push("/login");
  };

  const values = {
    user,
    setUser,
    login: login,
    logout: logout,
    register: register,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
