"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [variable, setVariable] = useState();
  const getData = (data) => {
    setVariable(data);
  };
  return (
    <SidebarContext.Provider value={{ variable, getData }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSide = () => useContext(SidebarContext);
