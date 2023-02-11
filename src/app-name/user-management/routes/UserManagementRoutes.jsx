import { Navigate, Route, Routes } from 'react-router-dom';
import { ListUsers, UserSelected, ListCodes, ListBlackToken } from '../pages';
import { NavBar } from '../components';

export const UserManagementRoutes = () => {
  return (
    <>
        <NavBar />

        <Routes>
            <Route path='list-users' element={ <ListUsers /> }/>
            <Route path='list-users/:id' element={ <UserSelected /> } />
            <Route path='list-codes' element={ <ListCodes /> } />
            <Route path='list-black-tokens' element={ <ListBlackToken /> } />
        </Routes>
    </>
  )
}
