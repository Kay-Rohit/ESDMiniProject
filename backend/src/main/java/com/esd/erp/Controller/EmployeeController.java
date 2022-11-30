package com.esd.erp.Controller;

import com.esd.erp.Bean.Employee;
import com.esd.erp.Service.EmployeeService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/employee")
public class EmployeeController {
    EmployeeService employeeService = new EmployeeService();
    /*
        Path: POST /api/employee/login
        Input: Student Object whose schema is defined in com.esd.erp.Bean.Employee
        Response: 200 (OK) + logged in Student object if login succeeded else 401 (Bad Request) with no body
    */
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Employee employee) {
        Employee loggedInEmployee = employeeService.login(employee);

        if(loggedInEmployee==null)
            return Response.status(401)
//                    .header("Access-Control-Allow-Origin", "*")
//                    .header("Access-Control-Allow-Credentials", "true")
//                    .header("Access-Control-Allow-Headers",
//                            "origin, content-type, accept, authorization")
//                    .header("Access-Control-Allow-Methods",
//                            "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .entity("Incorrect Credentials")
                    .build();
        else
            return Response.ok()
//                    .header("Access-Control-Allow-Origin", "*")
//                    .header("Access-Control-Allow-Credentials", "true")
//                    .header("Access-Control-Allow-Headers",
//                            "origin, content-type, accept, authorization")
//                    .header("Access-Control-Allow-Methods",
//                            "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .entity(loggedInEmployee)
                    .build();
    }
}
