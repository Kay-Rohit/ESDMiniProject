import React, {useRef,useState, useEffect} from 'react';
import axios from 'axios';
// import { jsPDF } from "jspdf"; --- tried this one as well but was not smooth

import MonthlySalaryHistoryPage from './pageComponent/MonthlySalaryHistory';
import swal from 'sweetalert';



const SalaryHistoryComponent= ({email, employeeid, firstname, lastname, title}) => {

    //getting current date
    let m = new Date();
    const monthName = m.toLocaleString('default', { month: 'long' });
    let y = m.getFullYear(); //get year 
    m = m.getMonth()+1; //getmonth will have index starting from 0, auto selecting last month
    // console.log(m);

    // console.log(lname)
    const[history, setHistory] = useState([]);
    const[month, setMonth] = useState(m);
    const[year, setYear] = useState(y);

    useEffect(() => {
        salaryHistory();
      },[]);

    const salaryHistory = async() => {
        await axios.get(`http://localhost:8080/ESD_Mini_Project-1.0-SNAPSHOT/api/salary/history?employeeid=${employeeid}`)
        .then((response) => {
            // console.log(response.data);
            setHistory(response.data); //storing to history variable
        })
        .catch((error) => {
            console.log(error);
            swal("Error fetching salary history, please check your internet connection!")
        })
    }

    //   --------------------------------Number to month function----------------------------------------

    function toMonthName(m) {
        const date = new Date();
        date.setMonth(m - 1);
        
        // 👇️ using visitor's default locale
        return date.toLocaleString([], {
            month: 'long', //used to specify name of month, long -> january, short -> jan
        });
        }
        // console.log(toMonthName(month));
        

    // --------------------------------------PRINT FUNCTION-------------------------------

    // console.log(history[0].payment_date.substring(5,7)) //this show that i can get month and year from here
    const uniqueMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const uniqueYears = [...new Set(history.map((item) => item.payment_date.substring(0,4)))]
    // console.log(uniqueYears); //getting all unique month values from payment history

const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('toPrint').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
    window.location.reload(true);
    // setMonth(null); //to reload the component
}
// ---------------------------------------------------------------------------------------------------------  

    return (
            <div className='container-fluid px-5 py-5'>
                <div className='row row-cols-md-2'>
                    <div className="card col col-md-3 text-white bg-dark h-50">
                        <div className="card-header text-uppercase fw-bold">
                            Employee Details
                        </div>
                        <div className="card-body">
                            <p className="card-text text-start">{title}. {firstname} {lastname}</p>
                            <p className="card-text text-start">Employee ID: {employeeid}</p>
                            <p className="card-text text-start">Email: {email}</p>
                        </div>
                    </div>
                    {/* <div className=""> */}
                    <div className='card col col-md-8 offset-md-1'>
                        <div className="card-header text-uppercase fw-bold">
                            Salary History
                        </div>
                        {/* making hostory consume only 50% of screen size */}
                        <div className="card-body overflow-auto" style={{height:"50vh"}}>  
                            <table className="table table-striped">
                                <thead className='thead-dark'>
                                    <tr>
                                    <th scope="col">Reference ID</th>
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
                                                    <td className='text-capitalize'>{hist.description}</td>
                                                    {/* this below code is the remove the time zone from the data returned by database */}
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
                    {/* </div> */}
                </div>
                {/* DROP DOWN to select month and year */}
                <div className='row mt-5 w-50'>
                    <div className='col input-group mb-3'>
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="monthSelect">select month</label>
                        </div>
                        <select
                        // style={{maxWidth:"30%"}}
                        onChange={(e)=>setMonth(parseInt(e.target.value))} //parsedInt to send date as integer
                        className="form-select" id="monthSelect"
                        >
                            <option selected disabled value="">{monthName}</option> 
                            {
                                uniqueMonths.map((mth)=>{
                                    return(
                                        <option value={mth}>{toMonthName(mth)}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className='col input-group mb-3'>
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="yearSelect">select year</label>
                        </div>
                        <select
                        onChange={(e)=>setYear(parseInt(e.target.value))} //parsedInt to send date as integer
                        className="form-select" id="yearSelect"
                        >
                            <option selected disabled value="">{year}</option> 
                            {
                                //show only the years , the employee is paid
                                uniqueYears.map((year)=>{
                                    var yearVal = parseInt(year);
                                    return(
                                        <option value={yearVal}>{yearVal}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                {/* ................................................................... */}
                
                {
                    // month &&
                    <div className='col mb-5 mt-5'>
                        <button className="btn btn-dark" onClick={Print}>
                        Download Salary Slip
                        </button>
                    </div>
                }
                <div className='row mt-4'>
                    {
                    // month && 
                    <>
                        {/* Will Print the entire content of the component MonthlySalaryHistoryPage  */}
                        {/* <div ref={reportTemplateRef}> */}
                            <div className="col-12 col-md-8 offset-md-2" id="toPrint"> 
                                <MonthlySalaryHistoryPage
                                eid={employeeid}
                                email={email}
                                fname={firstname}
                                lname={lastname}
                                title={title}
                                month={month}
                                year={year}
                                />
                            </div>
                        {/* </div> */}
                    </>
                    }       
                </div>
            </div>
    );
}


export default SalaryHistoryComponent;