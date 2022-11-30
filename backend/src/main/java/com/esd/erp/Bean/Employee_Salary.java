package com.esd.erp.Bean;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name="employee_salary")
public class Employee_Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer salaryid;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date payment_date;

    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "employeeid")
    private Employee employee;


    public Integer getSalaryid() {
        return salaryid;
    }

    public void setSalaryid(Integer salaryid) {
        this.salaryid = salaryid;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(Date payment_date) {
        this.payment_date = payment_date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee_Salary(){

    }

    public Employee_Salary(Integer salaryid, Date payment_date,Integer month, Double amount, String description) {
        this.salaryid = salaryid;
        this.payment_date = payment_date;
        this.amount = amount;
        this.description = description;
    }
}

