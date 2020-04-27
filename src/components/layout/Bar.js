import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, getUserAuth, logout } = authContext;

  useEffect(() => {
    getUserAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='app-header'>
      {user && <p className='nombre-usuario'>Hola {user.name}</p>}
      <nav className='nav-principal'>
        <button
          className='btn btn-blank cerrar-sesion'
          onClick={() => logout()}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};

export default Bar;
