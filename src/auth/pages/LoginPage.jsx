import { useEffect } from "react";
import { useForm } from '../../hooks/general'
//ToDo hook de useAuthStore
import { Link } from "react-router-dom";
//estilos
import Swal from "sweetalert2";
import { NavBar } from '../components/NavBar';
import LogoLogin from '../../assets/auth/account_circle.svg';
import '../styles/LoginPage.css';
import { TextField } from "@mui/material";
import { getEnvVariables } from '../../helpers';

const loginFormFields = {
  email: '',
  password: '',
};

const loginFormFieldsValidators = {
  email: [(value) => value.includes('@'), 'El campo email es obligatorio'],
  password: [(value) => value.length >= 8, 'El campo contraseña es obligatorio']
}

export const LoginPage = () => {
  console.log(getEnvVariables());

  return (
    <>
      <NavBar />
      
      <main className="main-login">
        <section className="modal-login">
            <div className="modal-login-img">
                <img src={ LogoLogin } alt="" />
            </div>
            <h5 className="modal-login-title">Login</h5>
            <p className="modal-login-text">Usuario gestión</p>
            <div className="modal-login-input">
                <div className="modal-login-input-email">
                  <TextField
                    required
                    id="standard-required"
                    label="Email"
                    defaultValue="example@gmail.com"
                    variant="filled"
                    size="small"
                    sx={{
                      width: 280,
                    }}
                  />
                </div>

                <div className="modal-login-input-password">
                  <TextField
                    required
                    id="standard-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    size="small"
                    sx={{
                      width: 280
                    }}
                  />
                </div>
            </div>

            <div className="modal-login-buttons">
                {/*ToDo onClick iniciar sesión*/}
                <button className="modal-login-option-login">Iniciar sesión</button>
                <Link to={'/auth/register'} className="modal-login-gopageregister">
                  Registrarse
                </Link>
            </div>
        </section>
    </main>
    </>
  )
};