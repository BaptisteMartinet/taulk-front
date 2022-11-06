import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import accountStore from 'store/app/account';
import { SnackbarContext } from 'core/contexts';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--purple2)',
});

const FormContainer = styled('div')({
  width: 'min(600px, 95%)',
  padding: '3em 8em',
  borderRadius: '16px',
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  '@media (max-width: 960px)': {
    padding: '1em',
  },
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

const LoginLink = styled(Link)({
  display: 'inline-block',
  color: 'blue',
  marginBlock: '1em',
});

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username should be at least 1 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
});

const Register: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const snackbarCtx = React.useContext(SnackbarContext);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      accountStore.register(values, {
        successCallback: () => {
          snackbarCtx.showSnack({ text: 'Success' }); // TODO lang
          navigate('/login');
        },
        errorCallback: () => {
          snackbarCtx.showSnack({ text: 'Someting went wrong', severity: 'error' }); // TODO lang
        },
      }).catch(() => { });
    },
  });
  return (
    <>
      <Helmet>
        <title>{t('pages.register.title')}</title>
      </Helmet>
      <Container>
        <FormContainer>
          <Form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
            <img src="assets/logos/logo_black.png" alt="Logo" width={128} />
            <FormTitle>{t('pages.register.form-title')}</FormTitle>
            <StyledTextField
              name="username"
              label="Username"
              variant="outlined"
              value={formik.values.username}
              error={formik.touched.username != null && Boolean(formik.errors.username)}
              helperText={formik.touched.username != null && formik.errors.username}
            />
            <StyledTextField
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              error={formik.touched.email != null && Boolean(formik.errors.email)}
              helperText={formik.touched.email != null && formik.errors.email}
            />
            <StyledTextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              error={formik.touched.password != null && Boolean(formik.errors.password)}
              helperText={formik.touched.password != null && formik.errors.password}
            />
            <StyledButton type="submit" variant="contained">{t('pages.register.form-submit')}</StyledButton>
          </Form>
          <LoginLink to="/login">{t('pages.register.login-link')}</LoginLink>
        </FormContainer>
      </Container>
    </>
  );
};

export default observer(Register);
