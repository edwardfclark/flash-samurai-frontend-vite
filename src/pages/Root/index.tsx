import { NavMenu } from './NavMenu';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

export function Root() {
  return (
    <>
      <NavMenu />
      <Container maxWidth="xl" sx={{ pt: '2rem' }}>
        <Outlet />
      </Container>
    </>
  );
}
