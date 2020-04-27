import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
  const taskCtx = useContext(taskContext);
  const { removeTask, getProjectTasks, updateTask, getEditionTask } = taskCtx;

  const handleRemoveTask = () => {
    removeTask(task._id, task.project);
    getProjectTasks(task.project);
  };

  const handleChangeTaskState = (task) => {
    task.state = !task.state;
    updateTask(task);
  };

  const handleSelectedTask = (task) => {
    getEditionTask(task);
  };

  return (
    <li className='tarea sombra'>
      <p>{task.name}</p>
      <div className='estado'>
        {task.state ? (
          <button
            type='button'
            className='completo'
            onClick={() => handleChangeTaskState(task)}
          >
            Completo
          </button>
        ) : (
          <button
            type='button'
            className='incompleto'
            onClick={() => handleChangeTaskState(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className='acciones'>
        <button
          type='button'
          className='btn btn-primario'
          onClick={() => handleSelectedTask(task)}
        >
          Editar
        </button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={handleRemoveTask}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
