import React, {createContext, ReactNode, useState} from 'react';

interface UserState {
  id?: string;
  createdAt?: any;
  deletedAt?: any;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

interface ContextType {
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  user: UserState;
}
const UserContext = createContext<ContextType>({user: {}, setUser: () => {}});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserState>({});
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
