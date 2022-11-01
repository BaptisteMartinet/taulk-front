import React, { FunctionComponent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import SnackbarContext from 'components/common/app/snackbar/SnackbarContext';

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

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  public {
    account {
      login(email: $email, password: $password) {
        id
        username
        email
        token
        createdAt
        updatedAt
      }
    }
  }
}
`;

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const snackbarCtx = React.useContext(SnackbarContext);
  const [login] = useMutation(LOGIN, {
    onCompleted: () => { navigate('/dashboard'); },
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
        <title>TAULK - Login</title>
      </Helmet>
      <Container>
        <FormContainer>
          <Form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
            <FormTitle>Welcome back!</FormTitle>
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
            <StyledButton type="submit" variant="contained">Log in</StyledButton>
          </Form>
          <RegisterLink to="/register">I don t have an account</RegisterLink>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
