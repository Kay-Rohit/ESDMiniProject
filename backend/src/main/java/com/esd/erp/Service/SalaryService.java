package com.esd.erp.Service;
import com.esd.erp.Bean.Employee_Salary;
import com.esd.erp.DAO.SalaryDAO;
import com.esd.erp.DAO.impl.SalaryDAOImpl;

import java.util.List;
public class SalaryService {
    SalaryDAOImpl salaryDAO = new SalaryDAOImpl();

    public List<Employee_Salary> getSalary(Integer emp_id, Integer month, Integer year){
        List<Employee_Salary> salaryList = salaryDAO.getSalary(emp_id, month, year);

        //removing reference
        for(Employee_Salary salary : salaryList)
            salary.setEmployee(null);

        return salaryList;
    }

    public List<Employee_Salary> getSalaryHistory(Integer emp_id){
        List<Employee_Salary> salaryList = salaryDAO.getSalaryHistory(emp_id);

        //removing reference
        for(Employee_Salary salary : salaryList)
            salary.setEmployee(null);

        return salaryList;
    }
}
