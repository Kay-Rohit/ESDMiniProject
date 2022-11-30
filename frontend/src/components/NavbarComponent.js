import React from "react";
import swal from "sweetalert";

const NavbarComponent = () => {

    function handleLogout(){
        window.sessionStorage.clear();
        swal ("Logged Out", "Successfully logged out", "success");
        window.location.reload(true);
    }


    return (
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <div className="container">
                    <a className="navbar-brand">Module 4.3</a>
                    <form className="form-inline">
                        <button className="btn btn-sm btn-light" type="button"
                        onClick={handleLogout}
                        >Log Out</button>
                    </form>
                </div>
            </nav>
    )
}

export default NavbarComponent