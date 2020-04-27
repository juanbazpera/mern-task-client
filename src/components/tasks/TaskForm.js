import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
  const projCtx = useContext(projectContext);
  const { project } = projCtx;
  const taskCtx = useContext(taskContext);
  const {
    errorForm,
    addTask,
    showError,
    getProjectTasks,
    taskToEdit,
    updateTask,
    removeEditTask,
  } = taskCtx;

  const [task, setTask] = useState({ name: '' });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: '' });
      removeEditTask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskToEdit]);

  if (!project) return null;
  const [actualProject] = project;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!task.name) {
      showError();
      return;
    }

    if (taskToEdit === null) {
      task.project = actualProject._id;
      addTask(task);
    } else {
      updateTask(task);
      removeEditTask();
    }

    getProjectTasks(actualProject._id);
    setTask({ name: '' });
  };

  return (
    <div className='formulario'>
      <form onSubmit={submit}>
        <div className='contenedor-input'>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre tarea'
            name='name'
            value={task.name}
            onChange={handleChange}
          />
        </div>
        <div className='contenedor-input'>
          <input
            type='submit'
            className='btn btn-primario btn-submit btn-block'
            value={taskToEdit ? 'Editar tarea' : 'Agregar tarea'}
          />
        </div>
      </form>
      {errorForm && (
        <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
};

export default TaskForm;
