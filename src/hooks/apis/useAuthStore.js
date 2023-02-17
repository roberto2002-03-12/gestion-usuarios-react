import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gestionUsuarioApi } from '../../api';
import { onChecking, onLoggin, onLogout, clearErrorMessage, onRegister } from '../../store'

export const useAuthStore = () => {
    //redux guarda los datos para uso global
    //acá estamos seleccionando la categoria auth
    const { status, user, errorMessage, registerMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLogin = async({email, password}) => {
        //cambiar el estado a checking
        dispatch(onChecking());

        try {
            //va mandar hacer el login y de esto nos va retornar un objeto, solo nos intereza data
            const { data } = await gestionUsuarioApi.post('/auth/login', {email, password});
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(onLoggin(data.user));
            navigate('/user-management');
        } catch (err) {
            dispatch(onLogout('credenciales incorrectas'));
            //despues de 10 segundos el mensaje error se borrara
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const startRegister = async (object, image) => {
        dispatch(onChecking());
        let newObj = { ...object};
        
        try {
            //agregamos a un formData
            const formData = new FormData();
            formData.append('nombre', newObj.nombre);
            formData.append('apellido', newObj.apellido);
            formData.append('numCelular', newObj.numCelular);
            formData.append('sexo', newObj.sexo);
            formData.append('dni', newObj.dni);
            formData.append('fechaNacimiento', newObj.fechaNacimiento);
            formData.append('ciudad', newObj.ciudad);
            formData.append('direccion', newObj.direccion);
            formData.append('ocupacion', newObj.ocupacion);
            formData.append('user[email]', newObj.email);
            formData.append('user[password]', newObj.password);
            formData.append('codigo', newObj.codigo);
            //si existe img entonces agregarlo
            if (image) formData.append('foto', image);

            await gestionUsuarioApi.post('/perfil', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });

            navigate('/login');

            dispatch(onRegister('Registrado correctamente'));
        } catch (err) {
            dispatch(onLogout(err.response?.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        
        try {
            const { data } = await gestionUsuarioApi.get('/auth/renew-token');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoggin(data.user));
        } catch (err) {
            localStorage.clear();
            dispatch(onLogout());
        };
    };

    const startLogout = () => {
        localStorage.clear();
        //ToDo onLogout userManagement
        dispatch(onLogout());
    };

    return {
        //propiedades
        errorMessage,
        status,
        user,
        registerMessage,
        //metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
};
