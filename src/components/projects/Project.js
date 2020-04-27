import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({ project }) => {
  const projCtx = useContext(projectContext);
  const taskCtx = useContext(taskContext);
  const { getProject } = projCtx;
  const { getProjectTasks } = taskCtx;

  const handleGetProject = (id) => {
    getProject(id);
    getProjectTasks(id);
  };

  return (
    <li>
      <button
        type='button'
        className='btn btn-blank'
        onClick={() => handleGetProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
