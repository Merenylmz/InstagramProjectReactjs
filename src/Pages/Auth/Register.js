import React, { useState } from "react";
import { login, register } from "../../Redux/Actions/AuthActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Register = () => {

    const [inputs, setInputs] = useState({name: null, email: null, password: null});
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const status = await register(inputs);

        return status ? navigate("/"):window.location.reload();
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "120px", color: "white"}}>
            <div style={{border: "1px solid gray", width: "450px", display: "block", padding: "20px", borderRadius: "20px"}}>
                <h3 style={{textAlign: "center"}}>Instagram</h3>
                <form method="post" onSubmit={handleSubmit}>
                    <label>Kullanıcı Adı:</label>
                    <input type="text" onChange={(e)=>setInputs({...inputs, name: e.target.value})} className="form-control" />
                    <label>Email:</label>
                    <input type="email" onChange={(e)=>setInputs({...inputs, email: e.target.value})} className="form-control" />
                    <label>Şifreniz:</label>
                    <input type="text" onChange={(e)=>setInputs({...inputs, password: e.target.value})} className="form-control" />
                    <br />
                    <button type="submit" className="btn btn-primary w-100 btn-sm">Kayıt ol</button>
                </form>
                <div className="d-flex justify-content-between mt-2">
                    <NavLink to={"/login"}>Zaten bir hesabım var, Giriş yap</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;
