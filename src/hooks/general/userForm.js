import { useEffect, useMemo, useState } from "react";

//solo va pasar un objeto, sin embargo, se va interpretar como dos objetos es decir ambos tendrán el mismo valor
//pero serán usados para diferentes funciones

//CORRECCIÓN si se tiene que definir la validacion en un objeto a parte
export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    //si el formState cambia entonces va ejecutar la creación de validaciones
    useEffect(() => {
        createValidators();
    }, [formState]);
    //resetea el formulario cuando se cambia el formulario
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    //formValidation debe estar vacio para saber si esta bien
    const isFormValid = useMemo(() => {
        //obtener los parametros no sus valores definidos
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        //en el caso de que este vacio entonces retornar que todo esta bien
        return true;
    }, [formValidation]);
    //recuerda que target es parte del dom de js, va en la parte de inputs
    const onInputChange = ({target}) => {
        const { name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues = {};

        //obtener los parametros que se quieren evaluar
        for (const formField of Object.keys(formValidations)) {
            //destructurar formValidations y declararles una forma de interpretación
            const [fn, errorMessage] = formValidations[formField];
            //formCheckedValues[`${formField}Valid`]: definir la clave al objeto
            //luego de definirlo le das un valor
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        };

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        //validaciones
        ...formValidation,
        isFormValid
    }
};