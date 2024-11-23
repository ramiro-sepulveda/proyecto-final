import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Verifica si el token está presente y es válido
const RutasObsoletas = () => {
    const token = localStorage.getItem('token'); // O el lugar donde guardes el token

    // Verifica si el token está presente y válido
    if (token) {
        return <Navigate to="/perfil" />; // Redirige a login si no hay token
    }

    // Si hay token, permite acceder a la ruta protegida
    return <Outlet />;
};

export default RutasObsoletas
