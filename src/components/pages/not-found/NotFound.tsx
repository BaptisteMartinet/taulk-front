import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Container = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled('h1')({
  fontSize: 'var(--fs-xl)',
});

const StyledLink = styled(Link)({
  fontSize: 'var(--fs-500)',
  color: 'blue',
});

const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pages.not-found.title')}</title>
      </Helmet>
      <Container>
        <Title>{t('pages.not-found.error-title')}</Title>
        <StyledLink to="/" style={{ color: 'blue' }}>{t('pages.not-found.go-back-link')}</StyledLink>
      </Container>
    </>
  );
};

export default NotFound;
