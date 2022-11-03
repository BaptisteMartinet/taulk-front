import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Button as MuiButton,
  TextField as MuiTextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useFormik } from 'formik';
import { AuthContext, SnackbarContext } from 'core/contexts';
import { LoginResponse } from 'core/api/types';
import { LoginMutation } from 'core/api/mutations';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--purple2)',
});

const FormContainer = styled('div')({
  width: '600px',
  padding: '3em 8em',
  borderRadius: '16px',
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
});

const Form = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const FormTitle = styled('h1')({
  fontSize: 'var(--fs-900)',
  marginBlock: '1em',
});

const TextField = styled(MuiTextField)({
  width: '100%',
  marginBlock: '.5em',
  fontSize: 'var(--fs-400)',
});

const Button = styled(MuiButton)({
  width: '100%',
  marginBlock: '.5em',
  fontSize: 'var(--fs-400)',
});

const RegisterLink = styled(Link)({
  display: 'inline-block',
  color: 'blue',
  marginBlock: '1em',
});

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authCtx = React.useContext(AuthContext);
  const snackbarCtx = React.useContext(SnackbarContext);
  const [loginMutation] = useMutation(LoginMutation, {
    onCompleted: (data) => {
      const res: LoginResponse = data.public.account.login;
      localStorage.setItem('token', res.token);
      authCtx.login(res.user);
      navigate('/dashboard');
    },
    onError: (error) => { snackbarCtx.showSnack({ text: error.message, severity: 'error' }); },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      loginMutation({ variables: { email, password } }).catch(() => { });
    },
  });
  return (
    <>
      <Helmet>
        <title>{t('pages.login.title')}</title>
      </Helmet>
      <Container>
        <FormContainer>
          <Form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
            <img src="assets/logos/logo_black.png" alt="Logo" width={128} />
            <FormTitle>{t('pages.login.form-title')}</FormTitle>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained">{t('pages.login.form-submit')}</Button>
          </Form>
          <RegisterLink to="/register">{t('pages.login.register-link')}</RegisterLink>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
