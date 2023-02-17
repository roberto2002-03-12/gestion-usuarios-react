import EditIcon from '../../../../../assets/app/ListaUsuario/edit_FILL0_wght400_GRAD0_opsz20.svg';
import DeleteIcon from '../../../../../assets/app/ListaUsuario/delete_FILL0_wght400_GRAD0_opsz20.svg';

export const TableListUsers = () => {
    return (
        <table className='table-users table'>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre y apellido</th>
                    <th>Email</th>
                    <th>Número</th>
                    <th>Ocupación</th>
                    <th>Estado</th>
                    <th>Fecha registro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                <tr className='align-middle'>
                    <td>D4101</td>
                    <td>Karthi Ramirez..</td>
                    <td>karthi@gmmail.com</td>
                    <td>99313412</td>
                    <td>Profesor</td>
                    <td>Activo</td>
                    <td>2022-03-23</td>
                    <td>
                        <a className="btn-details-user btn btn-info" href="#">
                            Detalles
                        </a>
                        <a className="table-users-options" href="#">
                            <img src={ EditIcon } alt="" />
                        </a>
                        <a className="table-users-options" href="#">
                            <img src={ DeleteIcon } alt="" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
