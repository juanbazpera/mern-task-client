import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskList = () => {
  const projCtx = useContext(projectContext);
  const taskCtx = useContext(taskContext);
  const { project, removeProject } = projCtx;
  const { projectTask } = taskCtx;

  if (!project) return <h2>Selecciona un proyecto</h2>;
  const [actualProject] = project;

  return (
    <Fragment>
      <h2>Projecto: {actualProject.name}</h2>
      <ul className='listado-tareas'>
        {projectTask.length === 0 ? (
          <li className='tarea'>
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {projectTask.map((task) => {
              return (
                <CSSTransition key={task._id} timeout={200} classNames='tarea'>
                  <Task task={task} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
      </ul>
      <button
        type='button'
        className='btn btn-eliminar'
        onClick={() => removeProject(actualProject._id)}
      >
        Eliminar proyecto &times;
      </button>
    </Fragment>
  );
};

export default TaskList;
