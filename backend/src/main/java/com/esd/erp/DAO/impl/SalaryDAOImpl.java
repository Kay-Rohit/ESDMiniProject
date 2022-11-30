package com.esd.erp.DAO.impl;

import com.esd.erp.Bean.Employee_Salary;
import com.esd.erp.DAO.SalaryDAO;
import com.esd.erp.Util.HibernateSessionUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class SalaryDAOImpl implements SalaryDAO {
    @Override
    public List<Employee_Salary> getSalary(Integer emp_id, Integer month, Integer year) {
        List<Employee_Salary> salaryList = new ArrayList<>();

        try(Session session = HibernateSessionUtil.getSession()){
            for(
                    final Object salary : session
                    .createQuery("FROM Employee_Salary WHERE employee.employeeid=:emp_id AND MONTH(payment_date)=:month AND YEAR(payment_date)=:year").
                    setParameter("emp_id", emp_id)
                    .setParameter("month", month)
                    .setParameter("year", year)
                    .list()
            )
                salaryList.add((Employee_Salary) salary);
        }
        catch (HibernateException e)
        {
            System.out.println(e.getLocalizedMessage());
        }
        return salaryList;
    }

    @Override
    public List<Employee_Salary> getSalaryHistory(Integer emp_id) {
        List<Employee_Salary> salaryHistoryList = new ArrayList<>();

        try(Session session = HibernateSessionUtil.getSession()){
            for(
                    final Object salary : session
                    .createQuery("FROM Employee_Salary WHERE employee.employeeid=:emp_id").
                    setParameter("emp_id", emp_id).list()
            )
                salaryHistoryList.add((Employee_Salary) salary);
        }
        catch (HibernateException e)
        {
            System.out.println(e.getLocalizedMessage());
        }
        return salaryHistoryList;
    }
}
