import { Route, Routes } from 'react-router-dom';
import QueHacer from '../pages/QueHacer';
import RegistroUsuario from '../pages/RegistroUsuario';
import Home from '../pages/Home'
import Contact from '../pages/Contact';
import RegistrarPropiedades from '../pages/RegistrarPropiedades';
import AdminPanel from '../pages/AdminPanel';
import FormUploadImages from '../components/FormUploadImages.jsx';
import ListadoPropiedades from '../components/ListadoPropiedades'
import DetalleInmueble from '../components/DetalleInmueble'
import Login from '../pages/Login.jsx';
import { withAuth } from '../hocs/withAuth';

/*
const isAuthenticated = true
const hasRequiredRoles = true
<Route path="/adminPanel" element={
      isAuthenticated && hasRequiredRoles(props.roles) ? <AdminPanel /> : <Navigate to="/" />
    }/>
    */
   // Envuelve RegistrarPropiedades con withAuth
const ProtectedRegistrarPropiedades = withAuth(RegistrarPropiedades);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/listadoPropiedades" element={<ListadoPropiedades />} />
    <Route path="/registrarPropiedad" element={<ProtectedRegistrarPropiedades />} />
    <Route path="/queHacer" element={<QueHacer />} /> 
    <Route path="/registrarUsuario" element={<RegistroUsuario />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/inmuebles/:id" element={<DetalleInmueble />} />
    <Route path="/adminPanel" element={<AdminPanel />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/formUploadImages" element={<FormUploadImages/>} />

  </Routes>
);

export default AppRoutes
