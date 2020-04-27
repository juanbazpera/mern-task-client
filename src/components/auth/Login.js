import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { message, auth, login } = authContext;

  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, auth]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.email.trim() === '' || user.password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    login({ user });
  };
  return (
    <div className='form-usuario'>
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' onChange={onChange} />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Iniciar Sesión'
            />
          </div>
        </form>
        <Link to={'/register'} className='enlace-cuenta'>
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;
