import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [ready, setReady] = useState('');
  console.log("setUser", user);

  useEffect(() => {
    if (!user) {
      axios.get("/api/users/profile").then(({data}) => {
        setUser(data);
        setReady('ready');
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
