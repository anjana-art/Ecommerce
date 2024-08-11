import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
   const[user, setUser] = useState(null);
   console.log('setUser', user)

   useEffect(()=>{
    if(user=== ''){
        axios.get('/api/users/profile')
    }
   }, []);

    return(
<UserContext.Provider value={{user, setUser}}>
{children}

</UserContext.Provider>    );
}