import React, { useState } from "react";
import { login } from "../../Redux/Actions/AuthActions";
import { useDispatch } from "react-redux";
import { useNavigate, } from "react-router";
import {NavLink} from "react-router-dom";

const Login = () => {

    const [inputs, setInputs] = useState({email: null, password: null});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await login(inputs);
        console.log(response);
        if (response.isAuth) {
            dispatch({type: "SET_USER_INFO", payloads: {...response, isAdmin: response.user.isAdmin, token: "deneme"}});
        }

        return response.isAuth === true ? navigate("/home") : alert("Giriş Başarısız \nLütfen bilgileri kontrol ediniz");
    };

   

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "120px", color: "white"}}>
            <div style={{border: "1px solid gray", width: "450px", display: "block", padding: "20px", borderRadius: "20px"}}>
                <h3 style={{textAlign: "center"}}>Instagram</h3>
                <form method="post" onSubmit={handleSubmit}>
                    <label>Kullanıcı Adı:</label>
                    <input type="email" onChange={(e)=>setInputs({...inputs, email: e.target.value})} className="form-control" />
                    <label>Şifreniz:</label>
                    <input type="password" onChange={(e)=>setInputs({...inputs, password: e.target.value})} className="form-control" />
                    <br />
                    <button type="submit" className="btn btn-primary w-100 btn-sm">Giriş Yap</button>
                </form>
                <div className="d-flex justify-content-between mt-2">
                    <NavLink to={"/register"}>Bir Hesabım Yok, Kayıt Ol</NavLink>
                    <NavLink to={"/forgotpassword"}>Şifremi Unuttum</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
