"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { getChek } from "../services/apiServices";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const STARTTIME = "too";
  const chec = async () => {
    const get = await getChek(cookies[STARTTIME]);
    if (get.status == "success") {
      login(get.data.username);
    }
    if (get.status == "fail") {
      removeCoo();
    }
  };

  const login = (ueserName) => {
    setIsLogin(true);
    setUserName(ueserName);
  };

  const removeCoo = () => {
    removeCookie(STARTTIME);
    setIsLogin(false);
    setUserName("");
  };
  useEffect(() => {
    if (cookies[STARTTIME]) {
      chec();
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ removeCoo, userName, isLogin, login }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSide = () => useContext(SidebarContext);
