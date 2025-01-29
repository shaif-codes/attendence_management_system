import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons library

function Login() {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const formdata = new FormData(document.getElementById("loginForm"))
        const loginOption = formdata.get("loginOptions");
        console.log(loginOption)

        const dataToSend = { uid, password, loginOption };
        console.log(dataToSend)

        try {
            const response = await fetch("/login/validation", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('Failed to send data to backend');
            }

            const responseData = await response.json();
            console.log(responseData)
            
            if (responseData.message === "Login Success") {   
                if(loginOption === 'admin') navigate('/admin', { state: { admin: responseData.admin } });
                else if(loginOption === 'teacher') navigate('/teacher', { state: { teacher: responseData.teacher } });
                else if(loginOption === 'student') navigate('/student', { state: { student: responseData.student } });
                // navigate('/home', { state: { student: responseData.student } });
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
            setError("An error occurred while logging in");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow w-50">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin} id='loginForm'>
                        <div className="form-group">
                            <label htmlFor="uid">Registration Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uid"
                                placeholder="Enter Registration Number"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                required
                                autoComplete='registration-number'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete='password'
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-primary "
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="loginType my-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="loginOptions" id="inlineRadio1" value="student" />
                                <label className="form-check-label" htmlFor="inlineRadio1">Student</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="loginOptions" id="inlineRadio2" value="teacher" />
                                <label className="form-check-label" htmlFor="inlineRadio2">Teacher</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="loginOptions" id="inlineRadio3" value="admin" />
                                <label className="form-check-label" htmlFor="inlineRadio3">Admin</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
