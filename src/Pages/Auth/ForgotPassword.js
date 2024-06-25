import React, { useState } from 'react'
import axios from "axios";
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState(null);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/api/auth/forgotpassword", {email});
        const data = response.data;

        return window.alert("Mail Kutunuz Kontrol edin<br>",data);
    };
    return (
        <div> <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "120px", color: "white"}}>
        <div style={{border: "1px solid gray", width: "450px", display: "block", padding: "20px", borderRadius: "20px"}}>
            <h3 style={{textAlign: "center"}}>Instagram</h3>
            <form method="post" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control mb-2" />
                <button type="submit" className="btn btn-primary w-100 btn-sm">Şifreyi değiştir</button>
            </form>
            <NavLink to={"/"}>Giriş Yap</NavLink>
        </div>
    </div></div>
    )
}

export default ForgotPassword