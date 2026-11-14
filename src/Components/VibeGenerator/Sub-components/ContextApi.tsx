import { createContext, useState, type ReactNode } from "react";

interface UserData {
  Food: string[];
  Colour: string[];
  Movie: string[];
  Destination: string[];
  Song: string[];
}

interface ContextType {
  userData: UserData;
  setuserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const Store = createContext<ContextType | null>(null);

const ContextApiForStoring = ({ children }: { children: ReactNode }) => {
  const [userData, setuserData] = useState<UserData>({
    Food: [],
    Colour: [],
    Movie: [],
    Destination: [],
    Song: [],
  });

  return (
    <Store.Provider value={{ userData, setuserData }}>
      {children}
    </Store.Provider>
  );
};

export default ContextApiForStoring;