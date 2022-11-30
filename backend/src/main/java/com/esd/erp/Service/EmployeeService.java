package com.esd.erp.Service;

import com.esd.erp.Bean.Employee;
import com.esd.erp.DAO.impl.EmployeeDAOImpl;

public class EmployeeService {
    EmployeeDAOImpl employeeDAO = new EmployeeDAOImpl();

    public Employee login(Employee employee){
        Employee loggedInEmployee = employeeDAO.login(employee);

//        if no login, then the result will give null

        if(loggedInEmployee==null){
            return null;
        }
        loggedInEmployee.setEmp_salary(null);

        return loggedInEmployee;
    }
}
