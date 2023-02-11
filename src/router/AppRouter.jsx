import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, RestorePage } from '../auth';
import { UserManagementRoutes } from '../app-name/user-management/routes/UserManagementRoutes';
//ToDo useAuthStore

export const AppRouter = () => {
  

  return (
    <Routes>
      <Route path='/auth/login' element={ <LoginPage/> }/>
      <Route path='/*' element={ <LoginPage/> }/>
      <Route path='/auth/register' element={ <RegisterPage/> }/>
      <Route path='/auth/restorepassword/:token' element={ <RestorePage/> } />
      <Route path='/user-management' element={ <UserManagementRoutes /> } />
    </Routes>
  );
};
