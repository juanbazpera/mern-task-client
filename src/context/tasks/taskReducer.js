import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_FORM,
  REMOVE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  REMOVE_EDIT_TASK,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTask: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        projectTask: [action.payload, ...state.projectTask],
        errorForm: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: true,
      };
    case REMOVE_TASK:
      return {
        ...state,
        projectTask: state.projectTask.filter(
          (task) => task._id !== action.payload
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        projectTask: state.projectTask.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        taskToEdit: null,
      };
    case REMOVE_EDIT_TASK:
      return {
        ...state,
        taskToEdit: null,
      };
    case ACTUAL_TASK:
      return {
        ...state,
        taskToEdit: action.payload,
      };

    default:
      return state;
  }
};
