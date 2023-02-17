import React from 'react';
import UcvLogo from '../../../assets/app/ucv-logo.png';
import Notification from '../../../assets/app/NavBar/notifications_FILL0_wght400_GRAD0_opsz20.svg';
import '../styles/style-lista-usuarios.css';

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <div className="navbar-brand-box me-auto">
                <img src={ UcvLogo } alt='UCV Logo'/>
                <a className="navbar-brand me-auto" href="#">UCV CID</a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-auto"></div>
                <div className="navbar-nav mx-auto">
                    <a className="nav-link" href="#">Inicio</a>
                    <a className="nav-link" href="#">Lista de usuarios</a>
                    <a className="nav-link" href="#">Lista de código</a>
                    <a className="nav-link" href="#">Guía</a>
                </div>
                <div className="navbar-nav ms-auto">
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={ Notification } alt="" />
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className='dropdown-divider'/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <a className="nav-link" href="#">Perfil</a>
                    <a className="nav-link" href="#">Cerrar sesión</a>
                </div>
            </div>
        </div>
    </nav>
  )
}
