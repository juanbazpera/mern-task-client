import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
  const [project, setProject] = useState({ name: '' });

  const projCtx = useContext(projectContext);
  const { form, showForm, errorForm, addProject, showError } = projCtx;

  const submit = (e) => {
    e.preventDefault();

    if (!project.name) {
      showError();
      return;
    }

    addProject(project);
    setProject({ name: '' });
  };
  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-block btn-primario'
        onClick={() => showForm()}
      >
        Nuevo proyecto
      </button>
      {form && (
        <form className='formulario-nuevo-proyecto' onSubmit={submit}>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre Proyecto'
            name='name'
            value={project.name}
            onChange={(e) =>
              setProject({ ...project, [e.target.name]: e.target.value })
            }
          />
          <input
            type='submit'
            className='btn btn-primario btn-block'
            value='Agregar proyecto'
          />
        </form>
      )}
      {errorForm && (
        <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
      )}
    </Fragment>
  );
};

export default NewProject;
