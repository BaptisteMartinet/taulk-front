import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Button as MuiButton,
  TextField as MuiTextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useFormik } from 'formik';
import { SnackbarContext } from 'core/contexts';
import accountStore from 'store/app/account';

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
  const snackbarCtx = React.useContext(SnackbarContext);
  React.useEffect(() => {
    if (accountStore.loaded && accountStore.user != null) {
      location.replace('/dashboard');
    }
  }, [accountStore.loaded, accountStore.user]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      accountStore.login({ email, password }, {
        errorCallback: () => {
          snackbarCtx.showSnack({ text: t('error.generic'), severity: 'error' });
        },
      }).catch(() => { });
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
              type="email"
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

export default observer(Login);
