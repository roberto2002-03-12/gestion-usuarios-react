import { memo } from 'react';
import '../styles/LoginPage.css';
import LogoLogin from '../../assets/auth/account_circle.svg';

export const LoginPageModalHeader = memo(() => {
console.log('solo debería renderizarme una vez');
  return (
    <>
        <div className="modal-login-img">
            <img src={ LogoLogin } alt="Logo login" />
        </div>
        <h5 className="modal-login-title">Login</h5>
        <p className="modal-login-text">Usuario gestión</p>
    </>
  )
});
