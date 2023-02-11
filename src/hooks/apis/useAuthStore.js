import { useDispatch, useSelector } from 'react-redux';
import { gestionUsuarioApi } from '../../api';
import { onChecking, onLoggin, onLogout, clearErrorMessage } from '../../store'

export const useAuthStore = () => {
    //redux guarda los datos para uso global
    //acá estamos seleccionando la categoria auth
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        //cambiar el estado a checking
        dispatch(onChecking());

        try {
            //va mandar hacer el login y de esto nos va retornar un objeto, solo nos intereza data
            const { data } = await gestionUsuarioApi.post('/auth/login', {email, password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(onLoggin(data.user));
        } catch (err) {
            dispatch(onLogout('credenciales incorrectas'));
            //despues de 10 segundos el mensaje error se borrara
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const startRegister = async (object) => {
        dispatch(onChecking());
        let newObj = { ...object};
        

        try {
            //la api debe recibir el objeto user donde se declara el email y contraseña
            newObj.user = {
                email: newObj.email,
                password: newObj.password
            }
            //borramos los datos que ya no van a ser necesarios
            delete newObj.email;
            delete newObj.password;
            delete newObj.passwordConfirm;

            const { data } = await gestionUsuarioApi.post('/perfil', newObj);

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init.date', new Date().getTime());
            dispatch(onLoggin(newObj));
        } catch (err) {
            dispatch(onLogout(err.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        //ToDo renew token
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
        //metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
};
