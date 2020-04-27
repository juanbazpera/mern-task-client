import React, { useReducer } from 'react';
import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_FORM,
  REMOVE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  REMOVE_EDIT_TASK,
} from '../../types';
import taskContext from './taskContext';
import taskReducer from './taskReducer';

import axiosClient from '../../config/axios';

const TaskState = (props) => {
  const initialState = {
    projectTask: [],
    errorForm: false,
    taskToEdit: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getProjectTasks = async (project) => {
    try {
      const result = await axiosClient.get('/api/tasks', {
        params: { project },
      });
      dispatch({ type: PROJECT_TASKS, payload: result.data.tasks });
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (task) => {
    try {
      const result = await axiosClient.post('/api/tasks', task);
      dispatch({ type: ADD_TASK, payload: result.data.task });
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
      dispatch({ type: REMOVE_TASK, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const showError = () => {
    dispatch({ type: VALIDATE_FORM });
  };

  const getEditionTask = (task) => {
    dispatch({ type: ACTUAL_TASK, payload: task });
  };

  const updateTask = async (task) => {
    try {
      const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
      dispatch({ type: UPDATE_TASK, payload: result.data.task });
    } catch (err) {
      console.log(err);
    }
  };

  const removeEditTask = () => {
    dispatch({ type: REMOVE_EDIT_TASK });
  };

  return (
    <taskContext.Provider
      value={{
        errorForm: state.errorForm,
        projectTask: state.projectTask,
        taskToEdit: state.taskToEdit,
        getProjectTasks,
        addTask,
        showError,
        removeTask,
        getEditionTask,
        updateTask,
        removeEditTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
