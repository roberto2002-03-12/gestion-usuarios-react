import { memo } from 'react'
import UcvLogo from '../../assets/app/ucv-logo.png';
import '../styles/NavBar.css';

export const NavBar = memo(() => {
  return (
    <>
      <nav className="navbar bg-body-tertiary" id="navbar-start-ucv-cid">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">
              <img src={ UcvLogo } alt="UCV LOGO" />
              UCV Gestión
            </span>
        </div>
      </nav>
    </>
  )
});
