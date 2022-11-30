package com.esd.erp.Bean;
import jakarta.persistence.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.json.bind.JsonbException;

@Entity
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeid;
    @Column(nullable = false)
    private String firstname;
    private String lastname;
    @Column(nullable = false, unique = true)
    private String email;
    @Column
    private String title;
//    private String photograph_path;
    @Column(nullable = false)
    private String password;
    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    @JsonIgnore // Doesn't seem to work in this case
    private List<Employee_Salary> emp_salary;

//    contructors ---------------------------------------------------------------------------------------------
    public Employee(){

    }
    public Employee(Integer employeeid, String firstname, String lastname, String email, String title, String password) {
        this.employeeid = employeeid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.title = title;
        this.password = password;
    }
//    ----------------------------------------------------------------------------------------------------------

    public Integer getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Integer employeeid) {
        this.employeeid = employeeid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Employee_Salary> getEmp_salary() {
        return emp_salary;
    }

    public void setEmp_salary(List<Employee_Salary> emp_salary) {
        this.emp_salary = emp_salary;
    }
}