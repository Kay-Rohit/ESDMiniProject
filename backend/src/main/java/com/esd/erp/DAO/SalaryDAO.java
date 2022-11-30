package com.esd.erp.DAO;
import com.esd.erp.Bean.Employee_Salary;

import java.util.*;

public interface SalaryDAO {
    List<Employee_Salary> getSalary(Integer employeeid, Integer month, Integer year);

    List<Employee_Salary> getSalaryHistory(Integer employeeid);

}
