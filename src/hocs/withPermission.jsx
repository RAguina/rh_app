import { useSelector } from 'react-redux';
import ErrorPage from '../components/ErrorPage';

export function withAuthorization(Component, roles) {
  return function AuthorizedRoute(props) {
    const { rol } = useSelector((state) => state.user);

    if (!roles.includes(rol)) {
      return <ErrorPage mensaje={"No tienes permiso para acceder a esta página."} />;
    }

    return <Component {...props} />;
  };
}