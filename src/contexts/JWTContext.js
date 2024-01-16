import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { HOST_API } from "../config";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
import { db } from "../database";
// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  SIGN_UP: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get(`${HOST_API}/api/user`);
          const u = response.data;
          if (localStorage.getItem("dashone") === "true") {
            preloadUser(u)
          }
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: u,
            },
          });
        } else {
          // Aqui consulta el usuario dentro de la db local para setearlo y que sea persistente
          db.user.toArray()
            .then(firstUser => {
              if (firstUser) {
                dispatch({
                  type: "INITIALIZE",
                  payload: {
                    isAuthenticated: true,
                    user: firstUser,
                  },
                });
              }
            })
            .catch(error => {
              console.error('Error al obtener el primer registro:', error);
            });
        }
      } catch (err) {
        console.error(err);
        console.log('fdadas');
        db.user.toArray()
          .then(firstUser => {
            if (firstUser) {
              dispatch({
                type: "INITIALIZE",
                payload: {
                  isAuthenticated: true,
                  user: firstUser,
                },
              });
            }
          })
          .catch(error => {
            console.error('Error al obtener el primer registro:', error);
          });
      }
    };

    initialize();
  }, []);

  const preloadUser = (user) => {
    if (user) {
      db.user.where('id').equals(user.id).first()
        .then(existingItem => {
          if (!existingItem) {
            db.user.add(user);
          }
        })
        .catch(error => {
          console.error('Error al validar la clave:', error);
        });
    }
  };

  const signIn = async (email, password) => {
    console.log(navigator.userAgent);
    const response = await axios.post(`${HOST_API}/api/login`, {
      username: email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    localStorage.setItem("user", user.displayName);
    localStorage.setItem("usertype", user.type_id);
    localStorage.setItem("dashone", true);
    dispatch({
      type: "SIGN_IN",
      payload: {
        user,
      },
    });
  };

  const signUp = async (email, password, firstName, lastName) => {
    const response = await axios.post(`${HOST_API}/api/auth/sign-up`, {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "SIGN_UP",
      payload: {
        user,
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    localStorage.setItem("user", null);
    localStorage.setItem("usertype", null);
    dispatch({ type: "LOGOUT" });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
