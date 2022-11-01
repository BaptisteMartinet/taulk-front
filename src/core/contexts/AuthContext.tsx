import React, { FunctionComponent, PropsWithChildren } from 'react';
import { User } from 'core/api/types';

interface AuthContextT {
  user: User | null
  login: (_user: User) => void
}

const AuthContext = React.createContext<AuthContextT>({
  user: null,
  login: () => { },
});

export const AuthContextProvider: FunctionComponent<PropsWithChildren<{}>> = (props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const login = (_user: User): void => {
    setUser(_user);
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
