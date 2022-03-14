import React, {useState} from "react";
import axios from "axios";


const Registration = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState("");

    // Single state of data to hold all data
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setConfirmReg(
                "Thank you for registering, you can now log in!",
            );
            setErrors("");
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        })
    }

    return(

        <div className="register">

            <h2> Register &hearts; </h2>

            {
                confirmReg?
                <h6> {confirmReg} </h6>
                : null
            }

            {
                errors.username? 
                    <p className="error-message"> {errors.username.message} </p>
                :null
            }

            {
                errors.email? 
                    <p className="error-message"> {errors.email.message} </p>
                :null
            }

            {
                errors.password? 
                    <p className="error-message"> {errors.password.message} </p>
                :null
            }

            {
                errors.confirmPassword? 
                    <p className="error-message"> {errors.confirmPassword.message}</p>
                :null
            }   
            
            <form onSubmit={register}>

                <div className="form-field">
                    <label> Username </label>
                    <input type="text" className="LR-input" name="username" required="required" value={user.username} onChange={(e) => handleChange(e)} onClick={()=> setConfirmReg("")} />
                </div>

                <div className="form-field">
                    <label> Email </label>
                    <input type="email" className="LR-input" name="email" required="required" value={user.email} onChange={handleChange} onClick={()=> setConfirmReg("")} />
                </div>

                <div className="form-field">
                    <label> Password </label>
                    <input type="password" className="LR-input" name="password" required="required" value={user.password} onChange={handleChange} onClick={()=> setConfirmReg("")} />
                </div>

                <div className="form-field">
                    <label> Confirm Password </label>
                    <input type="password" className="LR-input" name="confirmPassword" required="required" value={user.confirmPassword} onChange={handleChange} onClick={()=> setConfirmReg("")} />
                </div>

                <div className="form-field">
                    <input type="checkbox" className="LR-input" required="required" />
                    <text className="terms-policy"> 
                        I  agree with the <terms> Terms & Conditions</terms> and <terms> Privacy Policy </terms>
                    </text>
                </div>

                <button className="register-button"> Register </button>

            </form>

        </div>
    )
}

export default Registration;


