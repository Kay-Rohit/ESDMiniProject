package com.esd.erp.Controller;

import com.esd.erp.Bean.Employee_Salary;
import com.esd.erp.Service.SalaryService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;


@Path("/salary")
public class SalaryController {
    SalaryService salaryService = new SalaryService();

    @GET
    @Path("/get_salary_slip")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSalaryHistory(@QueryParam("employeeid") int employeeid, @QueryParam("month") int month, @QueryParam("year") int year){
        List<Employee_Salary> salaryList = salaryService.getSalary(employeeid, month, year);
        return Response.ok()
                .entity(salaryList)
                .build();
    }

    @GET
    @Path("/history")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSalary(@QueryParam("employeeid") int employeeid){
        List<Employee_Salary> salaryList = salaryService.getSalaryHistory(employeeid);
        return Response.ok()
                .entity(salaryList)
                .build();
    }
}

