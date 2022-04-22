import { createContext, useState, useEffect, ReactNode } from 'react';

interface NavBarProviderProps {
  children: ReactNode;
}

interface NavBarContextData {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NavBarContext = createContext({} as NavBarContextData);

export function NavBarProvider({ children }: NavBarProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <NavBarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
}
