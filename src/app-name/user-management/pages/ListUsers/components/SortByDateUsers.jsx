import ExpandLess from '../../../../../assets/app/ListaUsuario/expand_less_FILL0_wght400_GRAD0_opsz20.svg';
import ExpandMore from '../../../../../assets/app/ListaUsuario/expand_more_FILL0_wght400_GRAD0_opsz20.svg';

export const SortByDateUsers = () => {
  return (
    <div className="list-users-option-date">
        <p className="list-users-option-date-label">Ordenar por fechas</p>
        <button className='list-users-option-date-button'>
        <img src={ ExpandLess }/>
        <img src={ ExpandMore }/>
        </button>
    </div>
  )
}
