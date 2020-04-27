import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { message, auth, userRegister } = authContext;

  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, auth, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      user.name.trim() === '' ||
      user.email.trim() === '' ||
      user.password.trim() === '' ||
      user.confirm.trim() === ''
    ) {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    if (user.password.length < 6) {
      showAlert(
        'El password debe ser de al menos 6 caracteres',
        'alerta-error'
      );
      return;
    }

    if (user.password !== user.confirm) {
      showAlert('Los passwords no son iguales', 'alerta-error');
    }

    userRegister({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };
  return (
    <div className='form-usuario'>
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className='contenedor-form sombra-dark'>
        <h1>Crear cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              name='name'
              value={user.name}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={onChange}
            />
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
            <label htmlFor='confirm'>Confirmar Contraseña</label>
            <input
              type='password'
              id='confirm'
              name='confirm'
              value={user.confirm}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registar'
            />
          </div>
        </form>
        <Link to={'/'} className='enlace-cuenta'>
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
