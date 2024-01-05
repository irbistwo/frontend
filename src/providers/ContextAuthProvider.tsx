import React, {createContext, useEffect, useInsertionEffect, useLayoutEffect, useState} from 'react';
import {sendGetData, sendPostData} from "../service/service";
export const ProviderContextAuth:React.Context<any> = createContext({});
export const ProviderAuth = ({children}:{ children: JSX.Element }) => {
    // @ts-ignore
    const [user, setUser] = useState<string>(null);
    // @ts-ignore
    const [token, setToken] = useState<string|null>(null);
    useEffect (()=>{
        if(token) return;
        const profile= localStorage.getItem("token");

            if (profile === null) {

            } else {
                const  resuser=JSON.parse(profile);
                //setUser(resuser.profile.name);
                (async () => {
                    try {
                        const users = await get_userinfoORcheckISITtokenexpire(resuser.token);
                        setUser(users);
                      setToken(resuser.token)
                    } catch(e){
                        setUser("");
                        //setToken(null);
                        savetoken(null)
                    }
                })();

            }

    },[token])

    const get_token= ()=>{
        if(token!==null) return token
        console.log("token  null probably first init and async get_userinfoORcheckISITtokenexpire did not have time to validate saved token or user not autorized");
        const profile= localStorage.getItem("token");
      if(profile===null) return null;
        const  resuser:any=JSON.parse(profile);
      return  resuser.token
    }
const  get_userinfoORcheckISITtokenexpire=async (token:string):Promise<string> =>{
    const res = await sendGetData("/auth/userinfo",  token);
    const json=JSON.parse(res);
    return json.username;
}
const signout=()=>{
        savetoken(null);
    }
const savetoken=(token:string|null)=>{
const obj={token:token}
    localStorage.setItem("token",JSON.stringify(obj))
    setToken(token);
}
    return (
        <ProviderContextAuth.Provider value={{user,signout,token,savetoken,get_token}}>
            {children}
        </ProviderContextAuth.Provider>
    )

}
