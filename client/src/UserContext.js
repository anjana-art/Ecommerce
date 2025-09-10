import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [ready, setReady] = useState(false);

   useEffect(() => {
    async function getuser(){ 
      try {
        const {data} = await axios.get('/api/users/profile');
        setUser(data || {});
      } catch (e) {
        setUser({});
      } finally {
        setReady(true);
      }
    }
    getuser();

    
   /*  if (!user) {
      axios.get("/api/users/profile").then(({data}) => {
        setUser(data);
        console.log("setUser", data);
        setReady(true);
      });
    } */
  }, []);  

/* 
     useEffect(() => {
    if (!user) {
      axios({
          method:"get",
          baseURL:"http://localhost:5555/",
          url:"api/users/profile"
      }).then(({data}) => {
        setUser(data);
        setReady('ready');
        console.log("data user," , data);

      });
    }
  }, [user]);   */


  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
