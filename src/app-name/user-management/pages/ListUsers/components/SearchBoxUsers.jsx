import { useState } from 'react';
import { TextField, createTheme, ThemeProvider, FormControl, InputLabel, 
         Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio,
         Button, styled } from "@mui/material";
import { useForm } from '../../../../../hooks/general'

const inputsSearchUsers = {
    nameOrEmail: '',
    ocupacion: '',
    sexo: '',
    fechaRegistro: '',
};

const theme = createTheme({
    typography: {
        fontSize: 11
    }
});

const theme2 = createTheme({
    typography: {
        fontSize: 8
    }
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'gray',
    },
        '&.Mui-focused fieldset': {
          borderColor: 'gray',
          borderWidth: 1,
          backgroundColor: 'transparent', // establecer color de fondo transparente
        },
    },
})

export const SearchBoxUsers = () => {
    const {
        nameOrEmail,
        ocupacion,
        sexo,
        fechaRegistro,
        formState,
        onInputChange
    } = useForm(inputsSearchUsers);

    return (
        <section className='list-users-filter'>
            <h5 className="list-users-search-field">
                Buscar por nombre o correo
            </h5>
            <form className='list-users-form'>
                <div className="list-users-search-box">
                    <ThemeProvider theme={ theme }>
                        <TextField
                            label="Correo o Nombre"
                            variant="outlined"
                            name='nameOrEmail'
                            size='small'
                            value={ nameOrEmail }
                            onChange={ onInputChange }
                            sx={{
                                width: '170px'
                            }}
                        />
                    </ThemeProvider>
                </div>
                <div className="list-users-options">
                    <ThemeProvider theme={ theme2 }>
                        <FormControl>
                            <FormLabel id='user-filter-sex'>Sexo</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby='user-filter-sex'
                                name='sexo'
                                value={ sexo }
                                onChange={ onInputChange }
                            >
                                <FormControlLabel value={'F'} control={<Radio />} label='F'/>
                                <FormControlLabel value={'M'} control={<Radio />} label='M'/>
                            </RadioGroup>
                        </FormControl>
                    </ThemeProvider>
                </div>
                <div className="list-users-options">
                    <ThemeProvider theme={ theme }>
                        <FormControl variant='outlined' size='small' sx={{ width: '100px' }}>
                            <InputLabel id='filter-users-ocupation'>Ocupacion</InputLabel>
                                <Select
                                    labelId='filter-users-ocupation'
                                    id='filter-users-ocupation'
                                    defaultValue={'RRHH'}
                                    name='ocupacion'
                                    value={ ocupacion }
                                    onChange={ onInputChange }
                                >
                                    <MenuItem value={'abogado'}>Abogado</MenuItem>
                                    <MenuItem value={'contador'}>Contador</MenuItem>
                                    <MenuItem value={'programador'}>Programador</MenuItem>
                                </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>
                <div className="list-users-options">
                    <ThemeProvider theme={ theme }>
                        <StyledTextField
                            focused
                            label='Fecha registro'
                            variant="outlined"
                            type='date'
                            name='fechaRegistro'
                            size='small'
                            value={ fechaRegistro }
                            onChange={ onInputChange }
                            sx={{ width: '110px' }}
                        />
                    </ThemeProvider>
                </div>

                <div className="list-users-filter-button">
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        type='submit'
                    >
                        Buscar
                    </Button>
                </div>
            </form>
        </section>
    );
};
