import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, RestorePage } from '../auth';
import { UserManagementRoutes } from '../app-name/user-management/routes/UserManagementRoutes';
//ToDo useAuthStore
import { useAuthStore } from '../hooks/apis';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const authStatus = 'not-authenticated';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress/>
      </Box>
    )
  };

  return (
    <Routes>
      {
        (
          status === 'not-authenticated'
          ? (
            <>
              <Route path='/' element={ <Navigate to='/login' /> }/>
              <Route path='/*' element={ <Navigate to='/login' /> }/>
              <Route path='/login' element={ <LoginPage/> } />
              <Route path='/register' element={ <RegisterPage/> } />
            </>
          ) : (
            <>
              <Route path='/user-management/*' element={ <UserManagementRoutes/> }/>
            </>
          )
        )
      }
    </Routes>
  );
};
