package com.esd.erp.DAO.impl;

import com.esd.erp.Bean.Employee;
import com.esd.erp.DAO.EmployeeDAO;
import com.esd.erp.Util.HibernateSessionUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class EmployeeDAOImpl implements EmployeeDAO {

    @Override
    public Employee login(Employee employee) {
        try (Session session = HibernateSessionUtil.getSession()) {

            String emp_email = employee.getEmail();
            String emp_pwd = employee.getPassword();

            List<Object> result = new ArrayList<Object>(
                session.createQuery("from Employee where email=:email and password=:password")
                .setParameter("email", emp_email).setParameter("password", emp_pwd).list()
            );
            if (result.size() == 0)
                return null;
            else
                return (Employee) result.get(0);
        }
        catch (HibernateException exception) {
            System.out.print(exception.getLocalizedMessage());
        }

        return null;
    }
}

