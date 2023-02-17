import { SearchBoxUsers, SortByDateUsers, TableListUsers } from './components';
import '../../styles/style-lista-usuarios.css';

export const ListUsers = () => {
  return (
    <main>
      <SearchBoxUsers />

      <section className="list-users">
        <SortByDateUsers />
        <hr />
        <TableListUsers />
      </section>
    </main>
  );
}