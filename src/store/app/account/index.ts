import { GraphQLErrors } from '@apollo/client/errors';
import { observable, action, makeAutoObservable, flow } from 'mobx';
import apolloClient from 'apollo';
import {
  User,
  AccountLoginInput,
  LoginResponse,
  AccountRegisterInput,
} from 'core/api/types';
import { GetAccount } from 'core/api/queries';
import { LoginMutation, RegisterMutation } from 'core/api/mutations';

interface CallbacksOpts {
  successCallback?: () => void
  errorCallback?: (errors: GraphQLErrors) => void
}

class AccountStore {
  loaded: boolean = false;

  user: User | null = null;

  constructor() {
    makeAutoObservable(this, {
      loaded: observable,
      user: observable,
      setLoaded: action,
      setUser: action,
      init: flow,
    });
  }

  setLoaded(): void {
    this.loaded = true;
  }

  setUser(_user: User): void {
    this.user = _user;
  }

  async login(variables: AccountLoginInput, callbacks?: CallbacksOpts): Promise<void> {
    try {
      const res = await apolloClient.mutate({ mutation: LoginMutation, variables });
      const data: LoginResponse = res.data.public.account.login;
      localStorage.setItem('token', data.token);
      this.setUser(data.user);
    } catch (e) {
      callbacks?.errorCallback?.([]);
      return;
    }
    callbacks?.successCallback?.();
  }

  async register(variables: AccountRegisterInput, callbacks?: CallbacksOpts): Promise<void> {
    try {
      await apolloClient.mutate({ mutation: RegisterMutation, variables });
    } catch (e) {
      callbacks?.errorCallback?.([]);
      return;
    }
    callbacks?.successCallback?.();
  }

  async init(): Promise<void> {
    try {
      const res = await apolloClient.query({ query: GetAccount });
      this.setUser(res.data.authenticated.account);
    } catch (e) { }
    this.setLoaded();
  }
}

export default new AccountStore();
