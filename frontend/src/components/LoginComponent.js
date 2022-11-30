import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert'

import Loader from './Loader';

function LoginComponent(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [isloading,setIsLoading] = useState(false);
    var res=0;

    const enabled = email.length>0 && pwd.length>0;

    const handleLogin = async(event) => {
        event.preventDefault();
        setIsLoading(true);

        await axios.post('http://localhost:8080/ESD_Mini_Project-1.0-SNAPSHOT/api/employee/login', {
            email: email,
            password: pwd
        })
        .then((response) => {
            console.log(response);
            res = response.status;

            // storing response to local Storage as string because it was not accepting json 
            window.sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
            //if error is caught then show the alert popup
            swal({
                title: "Invalid Credentials",
                text: "Please check your email-id or password!!",
                icon: "error",
                button: "Try Again",
              });

            setIsLoading(false); //to stop showing loading on button   
            //reset form values
            setEmail('');
            setPwd('');
        })
    
        // var loginUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
        // console.log("user details",loginUser);

        //to reload page after user is valid user
        if(res===200){
            setEmail('');
            setPwd('');
            window.location.reload(true);
        }
        
    }

    return (
            <>
                <section className="vh-100 gradient-form" style={{backgroundColor: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                    <img src={require("./logo.png")}
                                        style={{width: "185px"}} alt="logo" />
                                    {/* <h4 className="mt-1 mb-5 pb-1">This is module 4.3 Login Page</h4> */}
                                    </div>

                                    <form className='mt-3 py-3'>
                                    <p>Please login to your account</p>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="email" className="form-control"
                                        placeholder="Email address" 
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        required
                                        />
                                        <label className="form-label" htmlFor="email">Username</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" className="form-control"
                                        placeholder="Your Password" 
                                        value={pwd}
                                        onChange={event => setPwd(event.target.value)}
                                        required
                                        />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button 
                                            className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3" type="button"
                                            onClick={handleLogin}
                                            disabled={!enabled}
                                            >
                                            {
                                                (isloading) ? <Loader customText="Signing in..."/> : "Login" //to show loading when clicked on login
                                            }
                                        </button>
                                    </div>
                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div className="text-black px-3 py-4 p-md-5 mx-md-4  text-justify">
                                    <h3 className="mb-4 text-uppercase">Human Resources</h3>
                                    <h5 className='text-left fw-bold'>4.3 Employee View Salary History</h5>
                                    <p className="text-justify">Ask the employee to login and then display the salary, the history of salary disbursements, also allow them to download the salary slip of a particular month.</p>
                                    <img src={require("./db_visualisation.png")}
                                        style={{width: "70%"}} alt="DB DIAGAM" />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </>
    );
}


export default LoginComponent;