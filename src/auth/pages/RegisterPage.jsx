import { useEffect, useState } from "react";
import { useForm } from '../../hooks/general';
import { useAuthStore } from '../../hooks/apis';
import '../styles/RegisterPage.css';
import Swal from 'sweetalert2';
import { NavBar } from "../components/NavBar";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, createTheme, ThemeProvider, InputLabel,
         Select, MenuItem, InputAdornment, FilledInput, FormHelperText, Button } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const theme = createTheme({
    typography: {
        fontSize: 11
    }
});

const registerFormField = {
    nombre: '',
    apellido: '',
    numCelular: '',
    sexo: '',
    dni: '',
    fechaNacimiento: '',
    ciudad: '',
    direccion: '',
    ocupacion: '',
    email: '',
    password: '',
    passwordConfirm: '',
    foto: '',
    codigo: ''
};

const registerFormValidations = {
    nombre: [(value) => value.length >= 3, 'El nombre es obligatorio'],
    apellido: [(value) => value.length >= 3, 'El apellido es obligatorio'],
    numCelular: [(value) => value.length == 9, 'El número de celular es obligatorio'],
    sexo: [(value) => value.length == 1, 'Declarar el sexo es obligatorio'],
    dni: [(value) => value.length == 8, 'El N° DNI es obligatorio'],
    fechaNacimiento: [(value) => {
        const fecha = new Date(value);
        return !isNaN(fecha.getTime())
    }, 'La fecha es obligatoria'],
    ciudad: [(value) => value.length >= 3, 'La ciudad es obligatorio'],
    direccion: [(value) => value.length >= 4, 'La dirección es obligatorio'],
    ocupacion: [(value) => value.length >= 4, 'La ocupación es obligatorio'],
    email: [(value) => value.includes('@'), 'El email es obligatorio'],
    password: [(value) => value.length >= 8, 'La contraseña debe tener por lo menos 8 caracteres'],
    codigo: [(value) => value.length >= 20, 'El código de confirmación es necesario']
};

export const RegisterPage = () => {
    //hook para registro de usuario
    const { startRegister } = useAuthStore();

    /*Mostrar contraseña u ocultarla*/
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    const handleMouseDownPassword = (event) => { event.preventDefault(); }
    const handleMouseDownPasswordConfirm = (event) => { event.preventDefault(); }

    /*useForm para formulario*/
    const {
        nombre,
        apellido,
        numCelular,
        sexo,
        dni,
        fechaNacimiento,
        ciudad,
        direccion,
        ocupacion,
        email,
        password,
        passwordConfirm,
        codigo,
        onInputChange: onInputRegisterChange,
        
        nombreValid,
        apellidoValid,
        numCelularValid,
        sexoValid,
        dniValid,
        fechaNacimientoValid,
        ciudadValid,
        direccionValid,
        ocupacionValid,
        emailValid,
        passwordValid,
        codigoValid,
        isFormValid,

        formState,
        onResetForm
    } = useForm(registerFormField, registerFormValidations);

    //useState para foto
    const [ selectedFile, setSelectedFile ] = useState([]);

    const handleImageChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    //saber el estado si se subio el formulario o no
    const [formSubmited, setFormSubmited] = useState(false);

    const onSubmitRegister = (event) => {
        //prevenir que se refresque la página
        event.preventDefault();

        if (password !== passwordConfirm) {
            Swal.fire('Error en registro', 'Las contraseñas no son iguales', 'error');
            return;
        }

        setFormSubmited(true);

        if (!isFormValid) return;
        
        startRegister(formState, selectedFile);
    };

    return (
        <>
            <NavBar />

            <main className="main-register">
                <div className="register-container">
                    <form onSubmit={ onSubmitRegister }>
                        <div className="register-inputs-row-1 mt-4 row">
                            <div className="register-inputs-title-1 col-lg-12">
                                <h5 className="register-inputs-h5">
                                    Datos personales
                                </h5>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Nombre"
                                    variant="filled"
                                    size="small"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={ onInputRegisterChange }
                                    error={ !!nombreValid && formSubmited }
                                    helperText={ !!nombreValid && formSubmited ? nombreValid : '' }
                                    sx={{
                                        width: 200,
                                        position: "relative"
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Apellido"
                                    variant="filled"
                                    size="small"
                                    name="apellido"
                                    value={ apellido }
                                    onChange={ onInputRegisterChange }
                                    error={ !!apellidoValid && formSubmited }
                                    helperText={ !!apellidoValid && formSubmited ? apellidoValid : '' }
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Número celular"
                                    type="number"
                                    variant="filled"
                                    size="small"
                                    name="numCelular"
                                    value={ numCelular }
                                    onChange={ onInputRegisterChange }
                                    error={ !!numCelularValid && formSubmited }
                                    helperText={ !!numCelularValid && formSubmited ? numCelularValid : '' }
                                    onInput={(e) => {
                                        //este metodo sirve para limitar la longitud de un número
                                        const maxLength = 9;
                                        e.target.value = e.target.value.slice(0, maxLength);
                                    }}
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                {/*de esta manera le declaramos el fontsize a un string*/}
                                <ThemeProvider theme={theme}>
                                    <FormControl error={ !!sexoValid && formSubmited }>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="sexo"
                                            value={sexo}
                                            onChange={ onInputRegisterChange }
                                        >
                                            <FormControlLabel value={'F'} control={<Radio />} label="Femenino" />
                                            <FormControlLabel value={'M'} control={<Radio />} label="Masculino" />
                                        </RadioGroup>
                                        {!!sexoValid && formSubmited ? <FormHelperText>{ sexoValid }</FormHelperText> : ''}
                                    </FormControl>
                                </ThemeProvider>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="DNI"
                                    type="number"
                                    variant="filled"
                                    size="small"
                                    name="dni"
                                    value={ dni }
                                    onChange={ onInputRegisterChange }
                                    error={ !!dniValid && formSubmited }
                                    helperText={ !!dniValid && formSubmited ? dniValid : '' }
                                    onInput={(e) => {
                                        //este metodo sirve para limitar la longitud de un número
                                        const maxLength = 8;
                                        e.target.value = e.target.value.slice(0, maxLength);
                                    }}
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Fecha nacimiento"
                                    type="date"
                                    variant="filled"
                                    size="small"
                                    focused
                                    name="fechaNacimiento"
                                    value={ fechaNacimiento }
                                    onChange={ onInputRegisterChange }
                                    error={ !!fechaNacimientoValid && formSubmited }
                                    helperText={ !!fechaNacimientoValid && formSubmited ? fechaNacimientoValid : '' }
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormControl variant="filled" sx={{ m: 1, width: 200 }} size="small" error={ !!ciudadValid && formSubmited }>
                                    <InputLabel required id="register-selec-cities">Ciudad</InputLabel>
                                    <Select
                                        labelId="register-selec-cities"
                                        id="register-selec-cities"
                                        defaultValue={'Lima'}
                                        name="ciudad"
                                        value={ ciudad }
                                        onChange={ onInputRegisterChange }
                                    >
                                        <MenuItem value={'Lima'}>Lima</MenuItem>
                                        <MenuItem value={'Trujillo'}>Trujillo</MenuItem>
                                        <MenuItem value={'Piura'}>Piura</MenuItem>
                                    </Select>
                                    { !!ciudadValid && formSubmited ? <FormHelperText>{ciudadValid}</FormHelperText> : ''}
                                </FormControl>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Dirección"
                                    variant="filled"
                                    size="small"
                                    name="direccion"
                                    value={ direccion }
                                    onChange={ onInputRegisterChange }
                                    error={ !!direccionValid && formSubmited }
                                    helperText={ !!direccionValid && formSubmited ? direccionValid : '' }
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormControl variant="filled" sx={{ m: 1, width: 200 }} size="small" error={!!ocupacionValid && formSubmited}>
                                    <InputLabel required id="register-select-works">Ocupación</InputLabel>
                                    <Select
                                        labelId="register-select-works"
                                        id="register-select-works"
                                        defaultValue={'Profesor'}
                                        name="ocupacion"
                                        value={ ocupacion }
                                        onChange={ onInputRegisterChange }
                                    >
                                        <MenuItem value={'Profesor'}>Profesor</MenuItem>
                                        <MenuItem value={'Guardian'}>Guardian</MenuItem>
                                        <MenuItem value={'Secretario/a'}>Secretario/a</MenuItem>
                                        <MenuItem value={'Manager'}>Manager</MenuItem>
                                    </Select>
                                    { !!ocupacionValid && formSubmited ? <FormHelperText>{ocupacionValid}</FormHelperText> : ''}
                                </FormControl>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Email"
                                    variant="filled"
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <AccountCircle />
                                          </InputAdornment>
                                        ),
                                    }}
                                    size="small"
                                    name="email"
                                    value={ email }
                                    onChange={ onInputRegisterChange }
                                    error={ !!emailValid && formSubmited }
                                    helperText={ !!emailValid && formSubmited ? emailValid : '' }
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormControl sx={{ width: 200 }} variant="filled" size="small">
                                    <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete=""
                                        name="password"
                                        value={ password }
                                        onChange={ onInputRegisterChange }
                                        error={ !!passwordValid && formSubmited }
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                    { !!passwordValid && formSubmited ? <FormHelperText>{ passwordValid }</FormHelperText> : ''}
                                </FormControl>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormControl sx={{ width: 200 }} variant="filled" size="small">
                                    <InputLabel htmlFor="filled-adornment-password-confirm">Repetir contraseña</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password-confirm"
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        autoComplete=""
                                        name="passwordConfirm"
                                        value={ passwordConfirm }
                                        onChange={ onInputRegisterChange }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPasswordConfirm}
                                                edge="end"
                                                >
                                                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <p className="form-control-title">Foto de perfil</p>
                                <input className="form-control form-control-sm" id="photoRegisterInput" type="file"
                                    accept="image/*" onChange={ handleImageChange }
                                />
                            </div>
                            <div className="register-inputs mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <TextField
                                    required
                                    label="Código confirmación"
                                    variant="filled"
                                    size="small"
                                    name="codigo"
                                    value={codigo}
                                    onChange={ onInputRegisterChange }
                                    error={ !!codigoValid && formSubmited }
                                    helperText={ !!codigoValid && formSubmited ? codigoValid : '' }
                                    sx={{
                                        width: 200,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="input-buttons mt-4 row">
                            <div className="register-button mt-2 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="error"
                                >
                                    <Link
                                        to={'/auth/login'}
                                        className="register-go-to-login"
                                    >
                                        Cancelar
                                    </Link>
                                </Button>
                            </div>
                            <div className="register-button mt-2 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    type="submit"
                                >
                                    Registrarse
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}