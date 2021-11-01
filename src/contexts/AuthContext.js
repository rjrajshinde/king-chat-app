import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    //! when our auth state is changed means when the user sign in or login into our application it will set the user and redirect to the chat window
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats"); //todo-  when user is set and the loading is false then it going to redirect to our chat application
    });
  }, [user, history]);

  const value = { user }; //* it's just for storing the user information

  return (
    //! here we are showing the children components when it's not loading
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
