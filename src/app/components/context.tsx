import React, { createContext, useState, ReactNode, FC } from 'react';

// Define the type for the context value
interface DataContextType {
  useContextData: {
    id: number;
    name: string;
  };
  setUseContextData: React.Dispatch<React.SetStateAction<{ id: number; name: string }>>;
}

// Define the type for the children prop
interface ContextProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

const DataContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [useContextData, setUseContextData] = useState({ id: 0, name: "" });

  return (
    <DataContext.Provider value={{ useContextData, setUseContextData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
