import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertsContext';

const ProjectsList = () => {
  const projCtx = useContext(projectContext);
  const alertContext = useContext(AlertContext);
  const { message, projects, getProjects } = projCtx;
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (projects.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className='listado-proyectos'>
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={200} classNames='proyecto'>
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
