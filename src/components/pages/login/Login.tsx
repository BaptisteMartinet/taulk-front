import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { LoginResponse } from 'core/api/types';
import { AuthContext, SnackbarContext } from 'core/contexts';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#5865f2',
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
  textAlign: 'center',
});

const FormTitle = styled('h1')({
  fontSize: 'var(--fs-900)',
  marginBlock: '1em',
});

const StyledTextField = styled(TextField)({
  width: '100%',
  marginBlock: '.5em',
  fontSize: 'var(--fs-400)',
});

const StyledButton = styled(Button)({
  width: '100%',
  marginBlock: '.5em',
  fontSize: 'var(--fs-400)',
});

const RegisterLink = styled(Link)({
  display: 'inline-block',
  color: 'blue',
  marginBlock: '1em',
});

const LoginMutation = loader('./LoginMutation.gql');

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authCtx = React.useContext(AuthContext);
  const snackbarCtx = React.useContext(SnackbarContext);
  const [login] = useMutation(LoginMutation, {
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
      login({ variables: { email, password } }).catch(() => { });
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
            <FormTitle>{t('pages.login.form-title')}</FormTitle>
            <StyledTextField
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
            />
            <StyledTextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formik.values.password}
            />
            <StyledButton type="submit" variant="contained">{t('pages.login.form-submit')}</StyledButton>
          </Form>
          <RegisterLink to="/register">{t('pages.login.register-link')}</RegisterLink>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
