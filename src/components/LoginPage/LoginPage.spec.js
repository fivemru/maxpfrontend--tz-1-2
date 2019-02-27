import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from './LoginPage';
import { ErrorMsg } from '../ErrorMsg';

describe('LoginPage', () => {
  const mockAuthLogin = jest.fn();

  const initProps = {
    isPending: false,
    error: null,
    isLogin: false,
    authLogin: mockAuthLogin,
  };

  const loginSel = 'TextInput[name="login"]';
  const passSel = 'TextInput[name="password"]';

  describe('init', () => {
    const props = { ...initProps };
    const storage = {
      login: 'remembered@mail.com',
      password: 'some pass',
    };
    sessionStorage.setItem('login', storage.login);
    sessionStorage.setItem('password', storage.password);
    const loginPage = shallow(<LoginPage {...props} />);

    it('no <Redirect />', () => {
      expect(loginPage.find('Redirect')).toHaveLength(0);
    });

    describe('setting initial values from sessionStorage', () => {
      it('for login input', () => {
        expect(loginPage.find(loginSel).prop('value')).toEqual(storage.login);
      });
      it('for password input', () => {
        expect(loginPage.find(passSel).prop('value')).toEqual(storage.password);
      });
    });

    describe('error', () => {
      it('no <ErrorMsg />', () => {
        expect(loginPage.find(ErrorMsg)).toHaveLength(0);
      });
      it('no error prop in login <TextInput />', () => {
        expect(loginPage.find(loginSel).prop('error')).toBeFalsy();
      });
      it('no error prop in password <TextInput />', () => {
        expect(loginPage.find(passSel).prop('error')).toBeFalsy();
      });
    });
  });
});
