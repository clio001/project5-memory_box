import React, { useEffect } from "react"

type UserProfileType = {
	firstName: string | null, 
	lastName: string | null, 
	email: string | null, 
	token: string | null,
}

interface Props {
  children?: React.ReactNode;
}
 
interface ContextProps {
	user: UserProfileType | null;
	setUser: (user: UserProfileType) => void;
	children?: React.ReactNode;
}

export const UserContext = React.createContext<ContextProps>({
  user: null,
  setUser: () => null,
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = React.useState<UserProfileType | null>(null);

  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};