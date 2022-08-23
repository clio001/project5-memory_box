import React, {useEffect} from "react";

type GroupsType = {
//   _id: string | null | undefined;
  name: string | null | undefined;
};

interface Props {
  children?: React.ReactNode;
}

interface ContextProps {
  group: GroupsType | null;
  setGroup: (group: GroupsType) => void;
}

export const GroupContext = React.createContext<ContextProps>({
  group: null,
  setGroup: () => null,
});

export const GroupContextProvider: React.FC<Props> = ({children}) => {
  const [group, setGroup] = React.useState<GroupsType | null>(null);

  return <GroupContext.Provider value={{group, setGroup}}>{children}</GroupContext.Provider>;
};
