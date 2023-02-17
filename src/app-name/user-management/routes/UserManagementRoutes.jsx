import { Navigate, Route, Routes } from 'react-router-dom';
import { ListUsers, UserSelected, ListCodes, ListBlackToken } from '../pages';
import { NavBar } from '../../components';

const links = [
  {
    link: 'list-users',
    name: 'Lista de usuarios'
  },
  {
    link: 'list-codes',
    name: 'Lista de código'
  },
  {
    link: 'list-black-tokens',
    name: 'Lista de tokens'
  }
]

export const UserManagementRoutes = () => {
  return (
    <>
      <NavBar links={ links } />

      <Routes>
        <Route path='/' element={ <Navigate to='list-users' /> } />
        <Route path='list-users' element={ <ListUsers /> }/>
        <Route path='list-users/:id' element={ <UserSelected /> } />
        <Route path='list-codes' element={ <ListCodes /> } />
        <Route path='list-black-tokens' element={ <ListBlackToken /> } />
      </Routes>
    </>
  )
}
