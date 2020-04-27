import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  REMOVE_PROJECT,
  PROJECT_ERROR,
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = (props) => {
  const initialState = {
    form: false,
    projects: [],
    errorForm: false,
    project: null,
    message: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showForm = () => {
    dispatch({ type: PROJECT_FORM });
  };

  const getProjects = async () => {
    try {
      const result = await axiosClient.get('/api/projects');
      dispatch({ type: GET_PROJECTS, payload: result.data.projects });
    } catch (err) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error',
      };
      dispatch({ type: PROJECT_ERROR, payload: alert });
    }
  };

  const addProject = async (project) => {
    try {
      const result = await axiosClient.post('/api/projects', project);
      dispatch({ type: ADD_PROJECT, payload: result.data });
    } catch (err) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error',
      };
      dispatch({ type: PROJECT_ERROR, payload: alert });
    }
  };

  const showError = () => {
    dispatch({ type: VALIDATE_FORM });
  };

  const getProject = (id) => {
    dispatch({ type: ACTUAL_PROJECT, payload: id });
  };

  const removeProject = async (id) => {
    try {
      await axiosClient.delete(`/api/projects/${id}`);
      dispatch({ type: REMOVE_PROJECT, payload: id });
    } catch (err) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error',
      };
      dispatch({ type: PROJECT_ERROR, payload: alert });
    }
  };

  return (
    <projectContext.Provider
      value={{
        form: state.form,
        projects: state.projects,
        errorForm: state.errorForm,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        showError,
        getProject,
        removeProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
