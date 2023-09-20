import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './employeeTypes';
import { employeesData } from '../../data';

// Load employees from localStorage or use initial data
const savedEmployees = JSON.parse(localStorage.getItem('crud')) || employeesData;

const initialState = {
  employees: savedEmployees,
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  let updatedEmployees;

  switch (action.type) {
    case ADD_EMPLOYEE:
      updatedEmployees = [...state.employees, action.employee || {}];
      localStorage.setItem('crud', JSON.stringify(updatedEmployees));
      return {
        ...state,
        employees: updatedEmployees,
      };

    case UPDATE_EMPLOYEE:
      updatedEmployees = state.employees.map((employee) => {
        if (employee.id === action.id) {
          return { ...employee, ...(action.employee || {}) };
        }
        return employee;
      });
      localStorage.setItem('crud', JSON.stringify(updatedEmployees));
      return {
        ...state,
        employees: updatedEmployees,
      };

    case DELETE_EMPLOYEE:
      updatedEmployees = state.employees.filter((employee) => employee.id !== action.id);
      localStorage.setItem('crud', JSON.stringify(updatedEmployees));
      return {
        ...state,
        employees: updatedEmployees,
      };

    default:
      return state;
  }
};
