import React, {useEffect} from "react";

type UserProfileType = {
  _id: string | null | undefined;
  token: string | null | undefined;
  __typename: string | null | undefined;
  firstName: string | null;
  lastName: string | null;
  email: string | null | undefined;
  avatar_url: string | null;
  banner_url: string | null;
  //   location: string | null;
  role: string | null | undefined;
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
