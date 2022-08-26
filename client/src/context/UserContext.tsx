import React, {useEffect} from "react";


// type groups = {
// 	name: string;
// 	avatar_url: string;
// 	banner_url: string;
// 	description: string;
// 	location: string;
// }
type Groups = {
	[key: string] : any
}

interface UserProfileType {
	__typename: string | null | undefined;
	_id: string | null | undefined;
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	token: string | null | undefined;
	email: string | null | undefined;
	role: string | null | undefined;
	avatar_url: string | null | undefined;
	banner_url: string | null | undefined;
	title: string | null | undefined;
	description: string | null | undefined;
  file_url: string | null | undefined;
  location?: any;
  //   location: string | null;
  groups?: any;
  items?: any;
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
