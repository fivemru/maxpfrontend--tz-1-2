import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextInput } from '../TextInput';
import { ErrorMsg } from '../ErrorMsg';
import { useValidation } from '../../helpers/useValidation';
import debug from '../../helpers/debug';
import './LoginPage.css';

const validate = {
  login: value =>
    (value.length < 3 ||
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )) &&
    'Email is not valid!',
  password: value =>
    value.length < 1 && 'Minimum password length is 1 characters!',
};

export const LoginPage = props => {
  const { isLogin, isPending, error, authLogin } = props;

  const initValues = {
    login: sessionStorage.getItem('login') || '',
    password: sessionStorage.getItem('password') || '',
  };

  // state
  const {
    values,
    errors,
    touched,
    isValid,
    setValues,
    setTouched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useValidation({
    initValues,
    validate,
    validateWhenInit: true,
    validateOnBlur: false,
    onSubmit: ({ login, password }) => {
      authLogin({ login, password }, err => {
        if (err) {
          setTouched({ ...touched, password: false });
          setValues({ ...values, password: '' });
        }
      });
    },
  });

  debug('render LoginPage');

  return (
    <>
      {isLogin && <Redirect to="/profile" />}
      <h1 className="login-form__title">Authorization</h1>

      <form className="login-form">
        <label>
          <TextInput
            type="email"
            name="login"
            autoComplete="email"
            placeholder="user@mail.com"
            value={values.login}
            isValid={!errors.login}
            error={touched.login && errors.login}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={isPending}
          />
        </label>

        <label>
          <TextInput
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={values.password}
            error={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={isPending}
          />
        </label>

        <button
          className="login-form__btn"
          onClick={handleSubmit}
          disabled={isPending || !isValid}
        >
          {isPending ? 'wait...' : 'login'}
        </button>

        {!isValid && error && <ErrorMsg error={error} />}
      </form>
    </>
  );
};

LoginPage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  authLogin: PropTypes.func.isRequired,
};
