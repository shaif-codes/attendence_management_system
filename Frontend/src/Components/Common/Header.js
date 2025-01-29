import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import './headerStyle.css';


const Header = (props) => {


    const [isActive, setIsActive] = useState('bi-list');

    const handleClick = () => {
        isActive === "bi-x" ? setIsActive("bi-list") : setIsActive("bi-x")
        const body = document.body
        if (body.className === "") {
            body.className = "mobile-nav-active"
        }
        else {
            body.className = ""
        }
    };

    const hadleLogout = () => {
        // Add logout logic here
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = "/login";
        }
    }


    return (
        <div>
            <i
                className={`bi mobile-nav-toggle d-xl-none ${isActive}`}
                onClick={handleClick}
            ></i>
            <header id="header">
                <div className="d-flex flex-column">

                    <div className="profile">
                        {/* Replace the image source with a dynamic import or a relative path */}
                        <img src="assets/img/profile-img.jpg" alt="" className="img-fluid rounded-circle" />
                        <h1 className="text-light"><Link to="/">{props.userDetails?.name}</Link></h1>
                        <h6 className="text-light" align='center'><Link to="/">{props.userDetails?.uid}</Link></h6>
                        <div className="social-links mt-3 text-center">
                            <a href="/" className="github" title='github handle'><i className="bx bxl-github"></i></a>
                            <a href="/" className="facebook" title='facebook handle'><i className="bx bxl-facebook"></i></a>
                            <a href="/" className="linkedin" title='linkedin handle'><i className="bx bxl-linkedin"></i></a>
                            <Link className="linkedin" title='logout' onClick={hadleLogout}><i className='bx bx-log-out'></i></Link>

                        </div>
                    </div>

                    <nav id="navbar" className="nav-menu navbar">
                        <ul>

                            {props.links?.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.to} className={`nav-link scrollto ${link.current? "active" : ""}`}>
                                        <i className={link.icon}></i>
                                        <span>{link.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <a href="/" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>
    );
}

export default Header;
