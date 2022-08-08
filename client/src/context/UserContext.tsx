import React, {useEffect} from "react";

type UserProfileType = {
  _id: string | null;
  __typename: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  avatar_url: string | undefined;
  banner_url: string | undefined;
};

interface Props {
  children?: React.ReactNode;
}

interface ContextProps {
  user: UserProfileType | null;
  setUser: (user: UserProfileType) => void;
}

export const UserContext = React.createContext<ContextProps>({
  user: null,
  setUser: () => null,
});

export const UserContextProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = React.useState<UserProfileType | null>(null);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};
