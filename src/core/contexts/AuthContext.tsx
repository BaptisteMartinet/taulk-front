import React, { FunctionComponent, PropsWithChildren } from 'react';
import { gql, useQuery } from '@apollo/client';
import { User } from 'core/api/types';

interface AuthContextT {
  user: User | null
  login: (_user: User) => void
}

const AuthContext = React.createContext<AuthContextT>({
  user: null,
  login: () => { },
});

const GetAccount = gql`
query GetAccount {
  authenticated {
    account {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
`;

export const AuthContextProvider: FunctionComponent<PropsWithChildren<{}>> = (props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const login = (_user: User): void => {
    setUser(_user);
  };
  useQuery(GetAccount, {
    onCompleted: (data) => {
      setUser(data.authenticated.account as User);
    },
  });
  return (
    <AuthContext.Provider value={{ user, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
