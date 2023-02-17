import { useEffect, useState } from "react";
import { useForm } from '../../hooks/general'
//ToDo hook de useAuthStore
import { Link } from "react-router-dom";
//estilos
import { NavBar, LoginPageModalHeader } from '../components';
import LogoLogin from '../../assets/auth/account_circle.svg';
import '../styles/LoginPage.css';
import { TextField } from "@mui/material";
import { useAuthStore } from "../../hooks/apis";
import Swal from "sweetalert2";

const loginFormFields = {
  email: '',
  password: '',
};

const loginFormFieldsValidators = {
  email: [(value) => value.includes('@'), 'El campo email es obligatorio'],
  password: [(value) => value.length >= 8, 'El campo contraseña es obligatorio']
};

export const LoginPage = () => {
  const { startLogin, errorMessage, registerMessage } = useAuthStore();

  const {
    email,
    password,
    onInputChange: onInputLoginChange,

    emailValid,
    passwordValid,

    formState,
    isFormValid
  } = useForm(loginFormFields, loginFormFieldsValidators);

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmitLogin = (event) => {
    event.preventDefault();

    setFormSubmited(true);

    if (!isFormValid) return;

    startLogin(formState);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);
  
  useEffect(() => {
    if (registerMessage !== undefined) {
      Swal.fire('Se logro registrar, espere al admin que le asigne un rol', registerMessage, 'success')
    }
  }, [registerMessage]);

  return (
    <>
      <NavBar />
      
      <main className="main-login">
        <section className="modal-login">
          <LoginPageModalHeader/>
          <form onSubmit={ onSubmitLogin }>
            <div className="modal-login-input">
              <div className="modal-login-input-email">
                <TextField
                  required
                  label="Email"
                  variant="filled"
                  size="small"
                  name="email"
                  value={ email }
                  onChange={ onInputLoginChange }
                  error={ !!emailValid && formSubmited }
                  helperText={ !!emailValid && formSubmited ? emailValid : '' }
                  sx={{
                    width: 280,
                  }}
                  />
                </div>

                <div className="modal-login-input-password">
                  <TextField
                    required
                    label="Contraseña"
                    type="password"
                    variant="filled"
                    size="small"
                    name="password"
                    value={ password }
                    onChange={ onInputLoginChange }
                    error={ !!passwordValid && formSubmited }
                    helperText={ !!passwordValid && formSubmited ? passwordValid : '' }
                    sx={{
                      width: 280
                    }}
                  />
                </div>
            </div>

            <div className="modal-login-buttons">
              <button 
                className="modal-login-option-login"
                type="submit"
              >
                Iniciar sesión
              </button>
              <Link to={'/register'} className="modal-login-gopageregister">
                Registrarse
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  )
};