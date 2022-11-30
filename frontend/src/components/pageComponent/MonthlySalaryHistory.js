import React,{useEffect, useState} from "react";
import axios from 'axios';

const MonthlySalaryHistoryPage = ({eid,email, fname, lname, title,month, year}) => {
    const[history, setHistory] = useState([]);
    console.log(eid, month, year);


    //calling api to fetch month
    const monthlySalaryHistory = async() => {
        // console.log("API CALLED");
        await axios.get(`http://localhost:8080/ESD_Mini_Project-1.0-SNAPSHOT/api/salary/get_salary_slip?employeeid=${eid}&month=${month}&year=${year}`)
        .then((response) => {
            console.log(`monthy salary of month of ${month}-${year}`,response.data);
            setHistory(response.data); //storing response into history state

        })
        .catch((error) => {
            console.log(error);
        })
    } 

    //using useEffect hook to fetch data whenever month changes
    useEffect(() => {
        monthlySalaryHistory();
      },[month, year]);



    //   --------------------------------Number to month function----------------------------------------

    function toMonthName(m) {
        const date = new Date();
        date.setMonth(m - 1);
      
        // 👇️ using visitor's default locale
        return date.toLocaleString([], {
          month: 'long', //used to specify name of month, long -> january, short -> jan
        });
      }
      
      console.log(toMonthName(month));
      

    // ---------------------------------------------------------------------





    return (
        <div className="container-fluid py-5 border">
            {(history.length !== 0) ?
            <div className="row">
                <div className='col-md-12'>
                    <div className="text-center lh-1 mb-2">
                        <h6 className="fw-bold">Payslip</h6> <span className="fw-normal">Payment slip for the month of {toMonthName(month)} {year}</span>
                    </div>
                    <div class="d-flex justify-content-end"> <span>Working Branch : IIITB</span> </div>
                    <div className="mt-3">
                        <div class="row">
                            <div class="d-flex justify-content-start">
                                <div> <span class="fw-bolder">Employee ID: </span>{eid}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-start">
                                <div> <span class="fw-bolder">Employee Name: </span>{title}. {fname} {lname}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-start">
                                <div> <span class="fw-bolder">Employee Email: </span>{email}</div>
                            </div>
                        </div>
                    </div>
                        <div className="align-middle mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Reference Id</th>
                                <th scope="col">Description</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    history.map((hist, index) => {
                                        return(
                                            <tr key={index}>
                                                <th scope="row">{hist.salaryid}</th>
                                                <td className="text-capitalize">{hist.description}</td>
                                                <td>{hist.payment_date.substring(0, hist.payment_date.length -1)}</td>
                                                <td>{hist.amount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                </div>
            </div> : 
            <div className="card">
                <div className="card-header">
                    You were not paid on this date. Please work to get paid :(
                </div>
            </div>
            }
        </div>
    )
}

export default MonthlySalaryHistoryPage;